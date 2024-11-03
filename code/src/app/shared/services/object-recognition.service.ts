import { Injectable } from '@angular/core';

import * as cocoSSD from '@tensorflow-models/coco-ssd';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root',
})
export class ObjectRecognitionService {
  private mobilenetModel: mobilenet.MobileNet | undefined;
  private cocoModel: cocoSSD.ObjectDetection | undefined;

  constructor() {
    // explicitly set backend
    tf.setBackend('webgl').catch(() => tf.setBackend('cpu'));
  }

  /**
   * Loads mobilenet and coco-ssd to improve performance
   */
  async loadModels() {
    this.getMobilenet();
    this.getCocoSSD();
  }

  private async getCocoSSD() {
    if (!this.cocoModel) {
      try {
        this.cocoModel = await cocoSSD.load({
          base: 'lite_mobilenet_v2',
        });
      } catch (error) {
        console.error('Unable to load coco-ssd model: ', error);
        throw error;
      }
    }
    return this.cocoModel;
  }

  private async getMobilenet() {
    if (!this.mobilenetModel) {
      try {
        this.mobilenetModel = await mobilenet.load({
          version: 2,
          alpha: 1.0, // Tunable to exchange performance for accuracy
        });
      } catch (error) {
        console.error('Unable to load mobilenet model: ', error);
        throw error;
      }
    }
    return this.mobilenetModel;
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
