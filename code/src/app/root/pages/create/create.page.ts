import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardAvatar } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CreateItemComponent } from '@root/components/create-item/create-item.component';
import { ItemComponent } from '@root/components/item/item.component';
import { RootRoutesEnum } from '@root/root-routes.enum';
import { ItemModel } from '@root/shared/models/item.model';
import { StateService } from '@root/state/state.service';

@Component({
  selector: 'root_create-page',
  standalone: true,
  imports: [CommonModule, CreateItemComponent, ItemComponent, MatButtonModule, MatIconModule],
  templateUrl: './create.page.html',
  styleUrl: './create.page.scss',
})
export class CreatePage {
  items: Signal<ItemModel[]>;

  constructor(
    private _router: Router,
    private _state: StateService,
  ) {
    this.items = this._state.getAllItems();
  }

  findClicked() {
    this._router.navigate([RootRoutesEnum.Find]);
  }
}
