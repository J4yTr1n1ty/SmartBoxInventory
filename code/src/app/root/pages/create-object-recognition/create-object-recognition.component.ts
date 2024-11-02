import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as cocoSSD from '@tensorflow-models/coco-ssd';

@Component({
  selector: 'app-create-object-recognition',
  standalone: true,
  imports: [],
  templateUrl: './create-object-recognition.component.html',
  styleUrl: './create-object-recognition.component.scss',
  animations: [
    trigger('bannerTrigger', [
      transition(':enter', [
        query('*', [
          style({ opacity: 0, transform: 'translateX(-50px)' }),
          stagger(50, [animate('250ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))]),
        ]),
      ]),
    ]),
  ],
})
export class CreateObjectRecognitionComponent implements OnInit, OnDestroy {
  private video: HTMLVideoElement | undefined;

  loading = false;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
  ) {}

  public async predictWithCocoModel() {
    cocoSSD.load().then((model) => this.detectFrame(this.video, model));
    console.log('predictWithCocoModel');
  }

  ngOnInit(): void {
    this.webcam_init();
  }

  webcam_init() {
    if (typeof document !== 'undefined') {
      this.loading = true;
      this.video = document.getElementById('vid') as HTMLVideoElement;

      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: 'environment',
          },
        })
        .then((stream) => {
          if (!this.video) {
            return;
          }
          this.video.srcObject = stream;
          this.loading = false;
          this.video.onloadedmetadata = () => {
            this.video!.play();
            this.predictWithCocoModel();
          };
        });
    }
  }

  stopWebcam() {
    if (this.video) {
      (<MediaStream>this.video.srcObject).getTracks().forEach((track) => track.stop());
    }
  }

  detectFrame = (video: any, model: cocoSSD.ObjectDetection) => {
    model.detect(video).then((predictions: any) => {
      console.log(predictions);
      this.renderPredictions(predictions);
      requestAnimationFrame(() => this.detectFrame(video, model));
    });
  };

  renderPredictions = (predictions: any) => {
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
        ctx.drawImage(this.video, 0, 0, 300, 350);
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

  ngOnDestroy(): void {
    this.stopWebcam();
  }
}
