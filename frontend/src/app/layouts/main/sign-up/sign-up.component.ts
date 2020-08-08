import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  passwordConfirmValidatorForm,
  passwordConfirmValidatorInput
} from "../../../core/validators/password.validator";
import { AuthService } from "../../../core/services/auth.service";
import { SwalService } from "../../../core/services/swal.service";
import { Router } from "@angular/router";
import { SharedService } from "../../../core/services/shared.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  public signUpForm: FormGroup;

  public constructor(private authService: AuthService, private swalService: SwalService,
                     private router: Router, private sharedService: SharedService) {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(null, [Validators.minLength(5), Validators.required]),
      passwordRepeat: new FormControl(null,
        [Validators.required, passwordConfirmValidatorInput('password')]),
    }, passwordConfirmValidatorForm('password', 'passwordRepeat'))
  }

  public async onSubmit() {
    try {
      const result = await this.authService.signUp(this.signUpForm.getRawValue());
      this.sharedService.updateUser(result.data);
      this.swalService.showBasicAlert({message: 'Successfully registered!'});
      this.router.navigate(['/']);
    } catch (e) {
      const errorMessage = e.error.data.reduce((previousValue, error) => {
        return previousValue + error.msg + '\n';
      }, '');
      this.swalService.showErrorAlert({message: errorMessage});
    }
  }

  public get firstName() {
    return this.signUpForm.get('firstName');
  }

  public get lastName() {
    return this.signUpForm.get('lastName');
  }

  public get email() {
    return this.signUpForm.get('email');
  }

  public get phoneNumber() {
    return this.signUpForm.get('phoneNumber');
  }

  public get password() {
    return this.signUpForm.get('password');
  }

  public get passwordRepeat() {
    return this.signUpForm.get('passwordRepeat');
  }
}
