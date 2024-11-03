import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { BoxComponent } from '@root/components/box/box.component';
import { ItemComponent } from '@root/components/item/item.component';
import { RootRoutesEnum } from '@root/root-routes.enum';
import { EntityEnum } from '@root/shared/enums/entity.enum';
import { BoxModel } from '@root/shared/models/box.model';
import { ItemModel } from '@root/shared/models/item.model';
import { StateService } from '@root/state/state.service';
import { merge } from 'rxjs';

@Component({
  selector: 'root_find-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
    ItemComponent,
    BoxComponent,
  ],
  templateUrl: './find.page.html',
  styleUrl: './find.page.scss',
})
export class FindPage {
  protected entityEnum: typeof EntityEnum = EntityEnum;
  entities: WritableSignal<(ItemModel | BoxModel)[]> = signal([]);

  boxesItems: FormControl<EntityEnum[] | null> = new FormControl<EntityEnum[] | null>([
    EntityEnum.Item,
    EntityEnum.Box,
  ]);
  searchTerm: FormControl<string | null> = new FormControl<string>('');

  constructor(
    private _router: Router,
    private _stateService: StateService,
  ) {
    merge(this.boxesItems.valueChanges, this.searchTerm.valueChanges).subscribe(() => {
      this.search();
    });
    this.search();
  }

  search() {
    let search: string = this.searchTerm.value ?? '';
    let entities: EntityEnum[] = this.boxesItems.value ?? [];
    this._stateService.filter(search, entities)();
    this.entities.set(this._stateService.filter(search, entities)());
  }

  findClicked() {
    this._router.navigate([RootRoutesEnum.Create]);
  }

  findInfo() {
    this._router.navigate([RootRoutesEnum.Home]);
  }

  isItem(entity: ItemModel | BoxModel): entity is ItemModel {
    return (entity as ItemModel).boxId !== undefined;
  }
}
