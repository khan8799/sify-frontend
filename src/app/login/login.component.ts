import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormErrors } from '../shared/utils/form-error-var';
import { CustomValidationMessages } from '../shared/utils/validation-message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userLoginForm: any;
  public formErrors: any = FormErrors;
  public validationMessages: any = CustomValidationMessages.validationMessages;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _userService: UserService,
  ) {}

  ngOnInit(): void {
    this.initializeUserLoginForm();
  }

  initializeUserLoginForm() {
    this.userLoginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }


  userLogin() {
    if (!this.isFormValid()) return;

    const apiData = { ...this.userLoginForm.value };

    this._userService.login(apiData).subscribe(
      (res) => {
        localStorage.setItem(
          "token",
          JSON.stringify(res.token)
        );
        localStorage.setItem(
          "userDetail",
          JSON.stringify(res.user)
        );
        window.location.href = "/";
      },
      (err) => console.log(err)
    );
  }

  isFormValid() {
    this.userLoginForm.markAllAsTouched();
    this.logValidationErrors();

    return this.userLoginForm.valid;
  }

  logValidationErrors(group: FormGroup = this.userLoginForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = "";
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const msg = this.validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) this.formErrors[key] = msg[errorKey] + " ";
        }
      }

      if (abstractControl instanceof FormGroup)
        this.logValidationErrors(abstractControl);
    });
  }

}
