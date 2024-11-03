import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { BoxComponent } from '@root/components/box/box.component';
import { ItemComponent } from '@root/components/item/item.component';
import { BoxModel } from '@root/shared/models/box.model';
import { ItemModel } from '@root/shared/models/item.model';
import { StateService } from '@root/state/state.service';

@Component({
  selector: 'root_cal-test-page',
  standalone: true,
  imports: [CommonModule, ItemComponent, BoxComponent],
  templateUrl: './cal-test.page.html',
  styleUrl: './cal-test.page.scss',
})
export class CalTestPage {
  items: Signal<ItemModel[]>;
  boxes: Signal<BoxModel[]>;

  constructor(private _state: StateService) {
    this.items = this._state.getAllItems();
    this.boxes = this._state.getAllBoxes();
    // this._state.getAllItems();
    // this._state.setItem({ name: 'ITEM', checked: false, boxId: 8, id: undefined });
    // this._state.setItem({ name: 'ITEM', checked: false, boxId: 8, id: undefined });
    // this._state.setItem({ name: 'ITEM', checked: false, boxId: 8, id: undefined });
    // this._state.setBox({ name: 'BOX', id: undefined, isFragile: true });
    // this._state.setBox({ name: 'BOX', id: undefined, isFragile: true });
    // this._state.setBox({ name: 'BOX', id: undefined, isFragile: true });
    // this._state.setBox({ name: 'BOX', id: undefined, isFragile: true });
  }
}
