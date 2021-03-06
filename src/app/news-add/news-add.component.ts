import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NewsService } from '../services/news.service';
import { UserSharedService } from '../services/user-shared.service';
import { FormErrors } from '../shared/utils/form-error-var';
import { CustomValidationMessages } from '../shared/utils/validation-message';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent implements OnInit {
  public userDetail: any;
  public userDetailSubscription: Subscription | any;

  public newsForm: any;
  public formErrors: any = FormErrors;
  public validationMessages: any = CustomValidationMessages.validationMessages;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _userSharedService$: UserSharedService,
    private _newsService: NewsService,
    private _toasterService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.initializeNewsForm();
    this.getUserDetail();
  }

  initializeNewsForm() {
    this.newsForm = this.fb.group({
      author: ["", [Validators.required]],
      content: ["", [Validators.required]],
      description: ["", [Validators.required]],
      title: ["", [Validators.required]],
      url: ["", [Validators.required]],
      urlToImage: ["", [Validators.required]],
      source: ["", [Validators.required]],
    });
  }

  getUserDetail() {
    this._userSharedService$.userInfo.subscribe(
      (user) => (this.userDetail = user)
    );
  }

  submit() {
    if (!this.isFormValid()) return;
    this.spinner.show();

    const data = {
      user: this.userDetail._id,
      ...this.newsForm.value
    }

    data['source'] = {
      id: 1,
      name: this.newsForm.value.source
    }

    this._newsService
      .add(data)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        res => {
          this._toasterService.success('Success', 'News bookmarked successfully.', {closeButton: true});
          this.router.navigate(['/']);
        },
        (err) => this._toasterService.error('Error', err.message, {closeButton: true})
      )
  }

  isFormValid() {
    this.newsForm.markAllAsTouched();
    this.logValidationErrors();

    return this.newsForm.valid;
  }

  logValidationErrors(group: FormGroup = this.newsForm): void {
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
