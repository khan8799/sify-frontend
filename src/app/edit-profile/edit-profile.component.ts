import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSharedService } from '../services/user-shared.service';
import { UserService } from '../services/user.service';
import { FormErrors } from '../shared/utils/form-error-var';
import { CustomValidationMessages } from '../shared/utils/validation-message';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  public userDetail: any;
  public userDetailSubscription: Subscription | undefined;
  public userForm: any;
  public formErrors: any = FormErrors;
  public validationMessages: any = CustomValidationMessages.validationMessages;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _userService: UserService,
    private _userSharedService$: UserSharedService,
    private _toasterService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initializeUserForm();
    this.getUserDetail();
  }

  initializeUserForm() {
    this.userForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
    });
  }

  getUserDetail() {
    this.userDetailSubscription = this._userSharedService$.userInfo.subscribe(
      (user) => {
        if (!user) return;

        this.userDetail = user;
        this.populateForm();
      }
    );
  }

  populateForm() {
    this.userForm.patchValue({
      firstName: this.userDetail.firstName,
      lastName: this.userDetail.lastName,
      email: this.userDetail.email
    })
  }

  submit() {
    if (!this.isFormValid()) return;
    this.spinner.show();

    const params = { _id: this.userDetail._id };
    const apiData = { ...this.userForm.value };

    this._userService
      .edit(params, apiData)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        (res) => {
          this._toasterService.success('Success', 'Profile edited successfully.', {closeButton: true});
          if (this.userDetailSubscription)
            this.userDetailSubscription.unsubscribe();

          this._userSharedService$.changeUserInfo(res.payload);
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

  ngOnDestroy(): void {
    if (this.userDetailSubscription)
      this.userDetailSubscription.unsubscribe();
  }

}
