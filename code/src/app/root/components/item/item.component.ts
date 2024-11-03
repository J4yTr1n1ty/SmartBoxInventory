import { CommonModule } from '@angular/common';
import { Component, Input, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BoxModel } from '@root/shared/models/box.model';
import { ItemModel } from '@root/shared/models/item.model';
import { StateService } from '@root/state/state.service';
import { MatMenuModule } from '@angular/material/menu';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialog } from '@root/dialogs/image/image.dialog';

@Component({
  selector: 'root_item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconButton,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  private _itemId!: number;
  @Input({ required: true })
  set itemId(value: number) {
    this._itemId = value;
    const item = this._stateService.getItem(value)();
    this.item.set(item);
    this.nameInput.setValue(item?.name ?? '');
  }
  get itemId(): number {
    return this._itemId;
  }

  private _isEdit: boolean = false;
  @Input()
  set isEdit(value: boolean) {
    this._isEdit = value;
    this.nameInput.setValue(this.item()?.name ?? '');
    this.boxInput.setValue(this.box() ?? null);
  }
  get isEdit(): boolean {
    return this._isEdit;
  }

  nameInput: FormControl<string | null> = new FormControl<string>('', [Validators.required]);
  boxInput: FormControl<BoxModel | null> = new FormControl<BoxModel | null>(null, [Validators.required]);

  protected item: WritableSignal<ItemModel | undefined> = signal(undefined);
  protected box: Signal<BoxModel | undefined> = computed(() => {
    const boxId = this.item()?.boxId;
    if (boxId == null) return;
    const box = this._stateService.getBox(boxId)();
    this.boxInput.setValue(box ?? null);

    return box;
  });
  protected boxes: Signal<BoxModel[]>;
  readonly dialog = inject(MatDialog);

  constructor(private _stateService: StateService) {
    this.boxes = this._stateService.getAllBoxes();
  }

  openImage(): void {
    this.dialog.open(ImageDialog, {
      width: '500px',
      height: '350px',
      data: {
        image: this.item()?.image,
        name: this.item()?.name,
      },
    });
  }

  save() {
    const newItem: ItemModel = {
      ...this.item()!,
      name: this.nameInput.value!,
      boxId: this.boxInput.value!.id!,
    };

    this._stateService.setItem(newItem);
    this.item.set(newItem);
    this.isEdit = false;
  }

  delete() {
    this._stateService.removeItem(this.item()!);
  }
}
