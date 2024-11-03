import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemComponent } from '@root/components/item/item.component';
import { ConfirmBoxDeletionDialog } from '@root/dialogs/confirm-box-deletion/confirm-box-deletion.dialog';
import { RootRoutesEnum } from '@root/root-routes.enum';
import { BoxModel } from '@root/shared/models/box.model';
import { ItemModel } from '@root/shared/models/item.model';
import { StateService } from '@root/state/state.service';

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
    ReactiveFormsModule,
    MatCheckboxModule,
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
  locationInput: FormControl<string | null> = new FormControl<string>('', [Validators.required]);
  fragileInput: FormControl<boolean | null> = new FormControl<boolean>(false);

  @Input()
  set isEdit(value: boolean) {
    this._isEdit = value;
    this.nameInput.setValue(this.box()?.name ?? '');
    this.locationInput.setValue(this.box()?.location ?? '');
    this.fragileInput.setValue(this.box()?.isFragile ?? false);
  }

  get isEdit(): boolean {
    return this._isEdit;
  }

  constructor(
    private _stateService: StateService,
    route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog,
  ) {
    const boxId = Number(route.snapshot.paramMap.get(RootRoutesEnum.BoxIdParam));
    this.items = this._stateService.getItemsByBoxId(boxId);

    this.box = this._stateService.getBox(boxId);
  }

  startEdit() {
    this.isEdit = true;
  }

  endEdit() {
    this.isEdit = false;
  }

  delete() {
    if (this.items().length == 0) {
      this._stateService.removeBox(this.box()!);
      this.goBack();
      return;
    }
    const dialogRef = this._dialog.open(ConfirmBoxDeletionDialog, {
      data: { boxId: this.box()!.id! },
      height: 'fit-content',
      width: '360px',
    });
    dialogRef.afterClosed().subscribe((v) => {
      if (v === true) {
        this._stateService.removeBox(this.box()!);
        this.goBack();
      }
    });
  }

  save() {
    if (this.nameInput.invalid || this.locationInput.invalid) return;

    const newBox: BoxModel = {
      ...this.box()!,
      location: this.locationInput.value ?? 'Room',
      name: this.nameInput.value ?? '',
      isFragile: this.fragileInput.value ?? false,
    };

    this._stateService.setBox(newBox);
    this.isEdit = false;
  }

  goBack() {
    this._router.navigate([RootRoutesEnum.Find]);
  }
}
