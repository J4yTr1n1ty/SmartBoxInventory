import { Component } from '@angular/core';
import { StateService } from '@root/state/state.service';

@Component({
  selector: 'root_cal-test-page',
  standalone: true,
  imports: [],
  templateUrl: './cal-test.page.html',
  styleUrl: './cal-test.page.scss',
})
export class CalTestPage {
  constructor(private _state: StateService) {
    this._state.getAllItems();
    this._state.setItem({ name: 'ahlol', beingEdited: false, checked: false, boxId: 8, id: undefined });
    this._state.setItem({ name: 'ahlol', beingEdited: false, checked: false, boxId: 8, id: undefined });
    this._state.setItem({ name: 'ahlol', beingEdited: false, checked: false, boxId: 8, id: undefined });
  }
}
