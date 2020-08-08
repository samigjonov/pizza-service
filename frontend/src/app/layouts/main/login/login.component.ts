import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
import { SwalService } from "../../../core/services/swal.service";
import { SharedService } from "../../../core/services/shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public loginForm: FormGroup;

  public constructor(private authService: AuthService, private router: Router,
                     private swalService: SwalService, private sharedService: SharedService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  public get email() {
    return this.loginForm.get('email');
  }

  public get password() {
    return this.loginForm.get('password');
  }

  public async onSubmit() {
    try {
      const result = await this.authService.login(this.loginForm.getRawValue());
      this.sharedService.updateUser(result.data);
      this.swalService.showBasicAlert({message: 'Logged in!'});
      this.router.navigate(['/']);
    } catch (e) {
      this.swalService.showErrorAlert({message: 'Incorrect username or password.'});
    }
  }
}
