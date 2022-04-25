import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { FormErrors } from '../shared/utils/form-error-var';
import { CustomValidationMessages } from '../shared/utils/validation-message';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public userForm: any;
  public formErrors: any = FormErrors;
  public validationMessages: any = CustomValidationMessages.validationMessages;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _userService: UserService,
    private _toasterService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initializeUserForm();
  }

  initializeUserForm() {
    this.userForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }


  submit() {
    if (!this.isFormValid()) return;
    this.spinner.show();

    const apiData = { ...this.userForm.value };

    this._userService
      .add(apiData)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        (res) => {
          this._toasterService.success('Success', 'Profile created successfully.', {closeButton: true});
          this.router.navigate(['/login']);
        },
        (err) => this._toasterService.error('Error', err.message, {closeButton: true})
      );
  }

  isFormValid() {
    this.userForm.markAllAsTouched();
    this.logValidationErrors();

    return this.userForm.valid;
  }

  logValidationErrors(group: FormGroup = this.userForm): void {
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
