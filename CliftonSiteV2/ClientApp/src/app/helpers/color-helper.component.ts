import { Injectable } from '@angular/core';

@Injectable()
export class ColorHelper {
  private lightColorList = [
    "dark",
    "primary",
    "info",
    "royal",
    "warning",
    "danger",
    "success"
  ];

  private darkColorList = [
    "light",
    "primary",
    "info",
    "royal",
    "warning",
    "danger",
    "success"
  ];

  public GetColorForLight(seed: number): string {

    if (seed >= this.lightColorList.length) {
      seed = seed % this.lightColorList.length;
    }

    return this.lightColorList[seed];
  }

  public GetColorForDark(seed: number): string {

    if (seed >= this.darkColorList.length) {
      seed = seed % this.darkColorList.length;
    }

    return this.darkColorList[seed];
  }
}
