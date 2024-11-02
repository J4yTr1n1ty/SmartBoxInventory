import { Injectable, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { StateModel } from './state.model';
import { ItemModel } from '@root/shared/models/item.model';
import { produce } from 'immer';
import { SetHelper } from '@root/shared/helpers/set.helper';
import { BoxModel } from '@root/shared/models/box.model';

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
    if (itemId == undefined) itemId = this.getLastItemId()() + 1;

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
    return computed(() => Object.values(this._state().items));
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

    box.id = boxId;
    this._state.update(
      produce((draft) => {
        delete draft.boxes[boxId];
      }),
    );
  }

  public getBox(boxId: number): Signal<BoxModel | undefined> {
    return computed(() => this._state().boxes[boxId]);
  }

  public getAllBoxes(): Signal<BoxModel[]> {
    return computed(() => Object.values(this._state().boxes));
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
}
