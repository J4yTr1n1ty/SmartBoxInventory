import { Component, effect, inject, Signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StateService } from '@root/state/state.service';
import { BoxModel } from '@root/shared/models/box.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CreateBoxDialog } from '@root/dialogs/create-box/create-box.dialog';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '@root/components/item/item.component';
import { ItemModel } from '@root/shared/models/item.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'root_create-item',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ItemComponent,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss',
})
export class CreateItemComponent {
  readonly dialog = inject(MatDialog);
  boxes: Signal<BoxModel[]>;

  nameInput: FormControl<string | null> = new FormControl<string>('', [Validators.required]);
  boxInput: FormControl<BoxModel | null> = new FormControl<BoxModel | null>(null, [Validators.required]);
  nameClearable: boolean = false;

  constructor(private _state: StateService) {
    this.boxes = this._state.getAllBoxes();
    effect(() => {
      const boxes = this.boxes();
      this.boxInput.setValue(boxes[0]);
    });
  }

  openDialog(): void {
    this.dialog.open(CreateBoxDialog, {
      width: '500px',
      height: '270px',
    });
  }

  create() {
    const name: string | null = this.nameInput.value;
    const boxId: number | null = this.boxInput.value?.id ?? null;

    if (name == null || boxId == null) return;

    const newItem: ItemModel = {
      id: undefined,
      name,
      boxId,
      checked: false,
    };

    this._state.setItem(newItem);
    this.nameClearable = true;
  }

  nameFocused() {
    if (this.nameClearable) {
      this.nameInput.setValue('');
      this.nameClearable = false;
    }
  }
}
