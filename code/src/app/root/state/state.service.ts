import { Injectable, WritableSignal, signal } from '@angular/core';
import { StateModel } from './state.model';
import { ItemModel } from '@root/shared/models/item.model';
import { produce } from 'immer';
import { SetHelper } from '@root/shared/helpers/set.helper';
import { BoxModel } from '@root/shared/models/box.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _state: WritableSignal<StateModel> = signal<StateModel>({
    boxes: {},
    items: {},
    indexes: {
      itemsByBoxId: {},
    },
  });

  public SetItem(item: ItemModel) {
    let itemId: number | undefined = item.id;
    if (itemId == undefined) itemId = this.getLastItemId();

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

  public RemoveItem(item: ItemModel) {
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

  public SetBox(box: BoxModel) {
    let boxId: number | undefined = box.id;
    if (boxId == undefined) boxId = this.getLastBoxId();

    box.id = boxId;
    this._state.update(
      produce((draft) => {
        draft.boxes[boxId] = box;
      }),
    );
  }

  public RemoveBox(box: BoxModel) {
    let boxId: number | undefined = box.id;
    if (boxId == undefined) return;

    box.id = boxId;
    this._state.update(
      produce((draft) => {
        delete draft.boxes[boxId];
      }),
    );
  }

  public getLastItemId(): number {
    const keys = Object.keys(this._state().items);

    return Number(keys[keys.length]);
  }

  public getLastBoxId(): number {
    const keys = Object.keys(this._state().boxes);

    return Number(keys[keys.length]);
  }
}
