import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { CreateItemComponent } from '@root/components/create-item/create-item.component';
import { ItemComponent } from '@root/components/item/item.component';
import { ItemModel } from '@root/shared/models/item.model';
import { StateService } from '@root/state/state.service';

@Component({
  selector: 'root_create-page',
  standalone: true,
  imports: [CommonModule, CreateItemComponent, ItemComponent],
  templateUrl: './create.page.html',
  styleUrl: './create.page.scss',
})
export class CreatePage {
  items: Signal<ItemModel[]>;

  constructor(private _state: StateService) {
    this.items = this._state.getAllItems();
  }
}
