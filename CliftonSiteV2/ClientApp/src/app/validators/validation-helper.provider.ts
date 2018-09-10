import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable()
export class Validation {

  public hasError(form: FormGroup, controlNames: string[], validationRules: string[]): boolean {

    var control = this.getFormControl(form, controlNames);

    if (!control || !validationRules || validationRules.length == 0) {
      return false;
    }

    let isValid = true;

    for (let i = 0; i < validationRules.length; i++) {

      isValid = isValid && !control.hasError(validationRules[i]);
    }

    return !isValid && (control.touched || control.dirty);
  }

  private getFormControl(form: FormGroup, controlNames: string[]): AbstractControl {

    let control: AbstractControl;

    for (let i = 0; i < controlNames.length; i++) {

      control = form.get(controlNames[i]);
    }

    return control;
  }
}
