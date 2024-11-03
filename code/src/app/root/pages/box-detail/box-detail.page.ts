import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
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
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './box-detail.page.html',
  styleUrl: './box-detail.page.scss',
})
export class BoxDetailPage {
  location: string = 'Room';
  items: Signal<ItemModel[]>;
  box: Signal<BoxModel | undefined>;
  private _isEdit: boolean = false;


  nameInput: FormControl<string | null> = new FormControl<string>('', [Validators.required]);
  destinationInput: FormControl<string | null> = new FormControl<string>('', [Validators.required]);


  @Input()
  set isEdit(value: boolean) {
    this._isEdit = value;
    this.nameInput.setValue(this.box()?.name ?? '');
    this.destinationInput.setValue(this.box()?.location ?? '');
  }

  get isEdit(): boolean {
    return this._isEdit;
  }

  constructor(
    private _stateService: StateService,
    route: ActivatedRoute,
    private _router: Router,
  ) {
    const boxId = Number(route.snapshot.paramMap.get(RootRoutesEnum.BoxIdParam));
    this.items = this._stateService.getItemsByBoxId(boxId);

    this.box = this._stateService.getBox(boxId);
  }

  edit() {
    this.isEdit = true;
  }

  close() {
    this._router.navigate([RootRoutesEnum.Find]);
  }
}
