import { Component, Inject, Signal } from '@angular/core';
import { StateService } from '@root/state/state.service';
import { CommonModule } from '@angular/common';
import { ItemModel } from '@root/shared/models/item.model';
import { ItemComponent } from '@root/components/item/item.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'root_confirm-box-deletion-dialog',
  templateUrl: './confirm-box-deletion.dialog.html',
  styleUrl: './confirm-box-deletion.dialog.scss',
  standalone: true,
  imports: [CommonModule, ItemComponent, MatDialogModule, MatButtonModule],
})
export class ConfirmBoxDeletionDialog {
  items: Signal<ItemModel[]>;

  constructor(
    private _stateService: StateService,
    @Inject(MAT_DIALOG_DATA) data: { boxId: number },
  ) {
    this.items = this._stateService.getItemsByBoxId(data.boxId);
  }
}
