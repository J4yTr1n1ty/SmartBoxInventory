import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { ItemComponent } from '@root/components/item/item.component';
import { ItemModel } from '@root/shared/models/item.model';
import { StateService } from '@root/state/state.service';

@Component({
  selector: 'root_cal-test-page',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './cal-test.page.html',
  styleUrl: './cal-test.page.scss',
})
export class CalTestPage {
  items: Signal<ItemModel[]>;

  constructor(private _state: StateService) {
    this.items = this._state.getAllItems();
    this._state.getAllItems();
    this._state.setItem({ name: 'ITEM', beingEdited: false, checked: false, boxId: 8, id: undefined });
    this._state.setItem({ name: 'ITEM', beingEdited: false, checked: false, boxId: 8, id: undefined });
    this._state.setItem({ name: 'ITEM', beingEdited: false, checked: false, boxId: 8, id: undefined });
    this._state.setBox({ name: 'BOX', id: undefined, isFragile: true });
    this._state.setBox({ name: 'BOX', id: undefined, isFragile: true });
    this._state.setBox({ name: 'BOX', id: undefined, isFragile: true });
    this._state.setBox({ name: 'BOX', id: undefined, isFragile: true });
  }
}
