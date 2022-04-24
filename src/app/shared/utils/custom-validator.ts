import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
    /*
    |   Email Validator
    */
    static emailValidator(control: AbstractControl): { [key: string]: any } | null {
      const email: string = control.value;

      if (!email) return null;
      else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return null;
      else return { invalid: true };
    }
}
