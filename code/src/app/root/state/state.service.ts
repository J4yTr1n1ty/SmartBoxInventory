import { Injectable, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { StateModel } from './state.model';
import { ItemModel } from '@root/shared/models/item.model';
import { produce } from 'immer';
import { SetHelper } from '@root/shared/helpers/set.helper';
import { BoxModel } from '@root/shared/models/box.model';
import { EntityEnum } from '@root/shared/enums/entity.enum';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _state: WritableSignal<StateModel>;

  constructor() {
    const initialStateJson = localStorage.getItem('state');
    try {
      const initialState: StateModel = JSON.parse(initialStateJson ?? '');
      this._state = signal<StateModel>(initialState);
    } catch {
      this._state = signal<StateModel>({
        boxes: {},
        items: {},
        indexes: {
          itemsByBoxId: {},
        },
      });
    }

    effect(() => {
      const stateJson = JSON.stringify(this._state());
      localStorage.setItem('state', stateJson);
    });
  }

  public setItem(item: ItemModel): void {
    let itemId: number | undefined = item.id;
    if (itemId == undefined) {
      itemId = this.getLastItemId()() + 1;
    } else {
      const oldItem: ItemModel | undefined = this._state().items[itemId];
      if (oldItem != null)
        this._state.update(
          produce((draft) => {
            let index = draft.indexes.itemsByBoxId[item.boxId] ?? [];
            SetHelper.remove(index, item.id);
            draft.indexes.itemsByBoxId[item.boxId] = index;
          }),
        );
    }
    item.id = itemId;
    this._state.update(
      produce((draft) => {
        draft.items[itemId] = item;
        let index = draft.indexes.itemsByBoxId[item.boxId] ?? [];
        SetHelper.add(index, item.id);
        draft.indexes.itemsByBoxId[item.boxId] = index;
      }),
    );
  }

  public removeItem(item: ItemModel): void {
    let itemId: number | undefined = item.id;
    if (itemId == undefined) return;

    this._state.update(
      produce((draft) => {
        delete draft.items[itemId];
        let index = draft.indexes.itemsByBoxId[item.boxId] ?? [];
        SetHelper.remove(index, item.id);
        draft.indexes.itemsByBoxId[item.boxId] = index;
      }),
    );
  }

  public getItem(itemId: number): Signal<ItemModel | undefined> {
    return computed(() => this._state().items[itemId]);
  }

  public getAllItems(): Signal<ItemModel[]> {
    return computed(() => Object.values(this._state().items).reverse());
  }

  public setBox(box: BoxModel) {
    let boxId: number | undefined = box.id;
    if (boxId == undefined) boxId = this.getLastBoxId()() + 1;

    box.id = boxId;
    this._state.update(
      produce((draft) => {
        draft.boxes[boxId] = box;
      }),
    );
  }

  public removeBox(box: BoxModel) {
    let boxId: number | undefined = box.id;
    if (boxId == undefined) return;

    this._state.update(
      produce((draft) => {
        for (const itemId of draft.indexes.itemsByBoxId[boxId] ?? []) {
          delete draft.items[itemId];
        }
        delete draft.boxes[boxId];
      }),
    );
  }

  public getBox(boxId: number): Signal<BoxModel | undefined> {
    return computed(() => this._state().boxes[boxId]);
  }

  public getAllBoxes(): Signal<BoxModel[]> {
    return computed(() => Object.values(this._state().boxes).reverse());
  }

  public getLastItemId(): Signal<number> {
    return computed(() => {
      const keys = Object.keys(this._state().items);

      if (keys.length == 0) return 0;

      return Number(keys[keys.length - 1]);
    });
  }

  public getLastBoxId(): Signal<number> {
    return computed(() => {
      const keys = Object.keys(this._state().boxes);

      if (keys.length == 0) return 0;

      return Number(keys[keys.length - 1]);
    });
  }

  public filter(search: string, entities: EntityEnum[]): Signal<(ItemModel | BoxModel)[]> {
    return computed(() => {
      const result: (ItemModel | BoxModel)[] = [];
      const state = this._state();
      search = search.toLowerCase();
      if (entities.includes(EntityEnum.Box)) {
        for (const box of Object.values(state.boxes)) {
          if (
            box.name.toLowerCase().includes(search) ||
            box.id?.toString().includes(search) ||
            box.location.toLowerCase().includes(search)
          ) {
            result.push(box);
          }
        }
      }
      if (entities.includes(EntityEnum.Item)) {
        for (const item of Object.values(state.items)) {
          if (item.name.toLowerCase().includes(search)) {
            result.push(item);
          }
        }
      }

      return result;
    });
  }
  getItemsByBoxId(boxId: number): Signal<ItemModel[]> {
    return computed(() => {
      const result: ItemModel[] = [];
      const state = this._state();
      const itemIds = state.indexes.itemsByBoxId[boxId] ?? [];
      for (let itemId of itemIds) {
        const item: ItemModel = state.items[itemId];
        if (item != null) {
          result.push(item);
        }
      }
      return result;
    });
  }
}
