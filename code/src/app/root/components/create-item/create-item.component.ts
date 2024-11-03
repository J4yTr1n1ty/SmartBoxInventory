import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import { RootRoutesEnum } from '@root/root-routes.enum';
import { Router } from '@angular/router';
import { ObjectRecognitionService } from '@shared/services/object-recognition.service';

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
    MatProgressSpinnerModule,
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss',
})
export class CreateItemComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  boxes: Signal<BoxModel[]>;

  nameInput: FormControl<string | null> = new FormControl<string>('New Item', [Validators.required]);
  boxInput: FormControl<BoxModel | null> = new FormControl<BoxModel | null>(null, [Validators.required]);
  imageInput: HTMLImageElement | undefined;
  imageLoaded: boolean = false;
  predictionLoading: boolean = false;
  nameClearable: boolean = true;

  constructor(
    private _state: StateService,
    private _router: Router,
    private _objectRecognitionService: ObjectRecognitionService,
  ) {
    this.boxes = this._state.getAllBoxes();
    effect(() => {
      const boxes = this.boxes();
      this.boxInput.setValue(boxes[0]);
    });
  }

  ngOnInit(): void {
    this.imageInput = document.getElementById('itemImage') as HTMLImageElement;
  }

  openDialog(): void {
    this.dialog.open(CreateBoxDialog, {
      position: {
        top: '48px',
      },
      width: '500px',
      height: '296px',
    });
  }

  findInfo() {
    this._router.navigate([RootRoutesEnum.Home]);
  }

  addImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';

    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (this.imageInput) {
            this.imageInput.src = reader.result as string;
            this.imageLoaded = true;
          }
        };
        reader.readAsDataURL(file);
      }
    };

    // Trigger file selection
    input.click();
  }

  AIPredictImage() {
    this.predictionLoading = true;
    if (this.imageInput && this.imageLoaded) {
      this._objectRecognitionService.predictWithMobilenetModel(this.imageInput).then((res) => {
        let topPrediction = res[0];
        this.nameInput.setValue(topPrediction.className);
        this.predictionLoading = false;
      });
    }
  }

  create() {
    const name: string | null = this.nameInput.value;
    const boxId: number | null = this.boxInput.value?.id ?? null;
    const image: string | null = this.imageInput?.src ?? null;

    if (name == null || boxId == null) return;

    const newItem: ItemModel = {
      id: undefined,
      name,
      boxId,
      checked: false,
      image,
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
