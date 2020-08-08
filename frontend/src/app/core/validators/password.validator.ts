import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function passwordConfirmValidatorInput(firstInputControlName): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const insertedValue = control.value;
    let firstInsertedValue = null;
    if (control.parent) {
      firstInsertedValue = control.parent.controls[firstInputControlName].value;
    }
    return insertedValue !== firstInsertedValue ? {passwordMismatch: 'Passwords did not match'} : null;
  };
}

export function passwordConfirmValidatorForm(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } => {
    const password = group.controls[passwordKey];
    const confirmPassword = group.controls[confirmPasswordKey];

    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  };
}
