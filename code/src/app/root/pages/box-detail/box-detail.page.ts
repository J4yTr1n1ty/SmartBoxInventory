import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemComponent } from '@root/components/item/item.component';
import { RootRoutesEnum } from '@root/root-routes.enum';
import { BoxModel } from '@root/shared/models/box.model';
import { ItemModel } from '@root/shared/models/item.model';
import { StateService } from '@root/state/state.service';
import { __runInitializers } from 'tslib';

@Component({
  selector: 'root_box-detail-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    ItemComponent,
  ],
  templateUrl: './box-detail.page.html',
  styleUrl: './box-detail.page.scss',
})
export class BoxDetailPage {
  location: string = 'Room';
  items: Signal<ItemModel[]>;
  box: Signal<BoxModel | undefined>;

  constructor(
    private _stateService: StateService,
    private _route: ActivatedRoute,
  ) {
    const boxId = Number(_route.snapshot.paramMap.get(RootRoutesEnum.BoxIdParam));
    this.items = this._stateService.getItemsByBoxId(boxId);

    this.box = this._stateService.getBox(boxId);
  }
}
