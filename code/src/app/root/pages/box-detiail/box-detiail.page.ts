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
  templateUrl: './box-detiail.page.html',
  styleUrl: './box-detiail.page.scss'
})
export class BoxDetiailPage {
  BoxName:string = "Default";
  BoxID:number = 0;
  Location:string = "Room";
  FragileBoolean:boolean = false;
  Fragile:string = "no";
  items:Signal<ItemModel[]>;

  constructor(private _stateService:StateService,private _route:ActivatedRoute){
    const boxId = _route.snapshot.paramMap.get(RootRoutesEnum.BoxIdParam);

    this.items = this._stateService.getItemsByBoxId(Number(boxId));
  }

  
}