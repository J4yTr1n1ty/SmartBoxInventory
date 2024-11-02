import { Injectable } from '@angular/core';

import * as cocoSSD from '@tensorflow-models/coco-ssd';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-cpu';

@Injectable({
  providedIn: 'root',
})
export class ObjectRecognitionService {
  constructor() {}

  private getCocoSSD(): Promise<cocoSSD.ObjectDetection> {
    return cocoSSD.load({
      base: 'mobilenet_v2',
    });
  }

  public async predictWithMobilenetModel(
    source: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
  ): Promise<
    Array<{
      className: string;
      probability: number;
    }>
  > {
    const model = await mobilenet.load();
    const predictions = await model.classify(source);
    return predictions;
  }

  public async predictWithCocoModel(
    source: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
  ): Promise<cocoSSD.DetectedObject[]> {
    const model = await this.getCocoSSD();
    const predictions = await model.detect(source);
    return predictions;
  }

  getTopPrediction(predictions: any) {
    let maxConfidence = 0;
    let maxConfidencePrediction = null;
    predictions.forEach((prediction: any) => {
      if (prediction.score > maxConfidence) {
        maxConfidence = prediction.score;
        maxConfidencePrediction = prediction;
      }
    });
    return maxConfidencePrediction;
  }
}
