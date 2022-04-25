import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
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
    private fb: FormBuilder,
    private _userService: UserService,
    private _toasterService: ToastrService,
    private spinner: NgxSpinnerService
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

    this.spinner.show();

    const apiData = { ...this.userLoginForm.value };

    this._userService
      .login(apiData)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        (res) => {
          this._toasterService.success('Success', 'Login successfully.', {closeButton: true});
          localStorage.setItem("token", JSON.stringify(res.token));
          window.location.href = "/";
        },
        (err) => this._toasterService.error('Error', err.message, {closeButton: true})
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
