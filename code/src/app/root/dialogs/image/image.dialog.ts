import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ImageDialogData {
  image: string;
  name: string;
}

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.dialog.html',
  styleUrl: './image.dialog.scss',
})
export class ImageDialog {
  readonly dialogRef = inject(MatDialogRef<ImageDialog>);
  readonly data = inject<ImageDialogData>(MAT_DIALOG_DATA);
}
