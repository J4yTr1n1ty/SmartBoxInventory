import { Injectable } from '@angular/core';

import * as cocoSSD from '@tensorflow-models/coco-ssd';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

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

  private getMobilenet(): Promise<mobilenet.MobileNet> {
    return mobilenet.load({
      version: 2,
      alpha: 1, // Tunable parameter to control accuracy vs speed
    });
  }

  /**
   * Predicts with mobilenet
   * More classes, more precise but slower
   * @param source Image or video data to predict
   * @param num Number of predictions to return
   * @returns Mobilenet predictions
   */
  public async predictWithMobilenetModel(
    source: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    num: number = 1,
  ): Promise<
    Array<{
      className: string;
      probability: number;
    }>
  > {
    const model = await this.getMobilenet();
    const predictions = await model.classify(source, num);
    return predictions;
  }

  /**
   * Predicts with coco-ssd
   * Less classes, less precise but faster
   * @param source Image or video data to predict
   * @param num Number of predictions to return
   * @returns Coco predictions
   */
  public async predictWithCocoModel(
    source: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    num: number = 1,
  ): Promise<cocoSSD.DetectedObject[]> {
    const model = await this.getCocoSSD();
    const predictions = await model.detect(source, num);
    return predictions;
  }
}
