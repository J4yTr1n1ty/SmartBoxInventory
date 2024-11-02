import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ObjectRecognitionService } from '@shared/services/object-recognition.service';
import { DetectedObject } from '@tensorflow-models/coco-ssd';

@Component({
  selector: 'app-create-object-recognition',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatProgressSpinnerModule, CommonModule, MatButtonModule],
  templateUrl: './create-object-recognition.component.html',
  styleUrl: './create-object-recognition.component.scss',
})
export class CreateObjectRecognitionComponent implements OnInit {
  private video: HTMLVideoElement | undefined;
  private image: HTMLImageElement | undefined;

  constructor(private _objectRecognitionService: ObjectRecognitionService) {}

  loading = false;

  uploadImage(event: any) {
    this.loading = true;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (this.video) {
        this.video.srcObject = null;
      }
      if (this.image) {
        this.image.src = reader.result as string;
        this.image.onload = () => {
          this._objectRecognitionService.predictWithCocoModel(this.image!).then((predictions) => {
            console.log(predictions);
            this.renderPredictions(predictions);
          });
          this.loading = false;
        };
      }
    };
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.loading = true;
    this.image = document.getElementById('image') as HTMLImageElement;
  }

  renderPredictions = (predictions: DetectedObject[]) => {
    if (typeof document !== 'undefined') {
      const canvas = <HTMLCanvasElement>document.getElementById('canvas');
      let ctx: any;
      let font: any;
      if (canvas) {
        ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 300;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Font options.
        font = '16px sans-serif';
        ctx.font = font;
        ctx.textBaseline = 'top';
        if (this.video) {
          ctx.drawImage(this.video, 0, 0, 300, 300);
        } else if (this.image) {
          ctx.drawImage(this.image, 0, 0, 300, 300);
        }
      }

      predictions.forEach((prediction: any) => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];
        // Draw the bounding box.
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        // Draw the label background.
        ctx.fillStyle = '#00FFFF';
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10); // base 10
        ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
      });

      predictions.forEach((prediction: any) => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        // Draw the text last to ensure it's on top.
        ctx.fillStyle = '#000000';
        ctx.fillText(prediction.class, x, y);
      });
    }
  };
}
