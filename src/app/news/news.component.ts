import { Router } from '@angular/router';
import { NewsSharedService } from './../services/news-shared.service';
import { NewsService } from './../services/news.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { News } from '../models/News';
import { UserSharedService } from '../services/user-shared.service';
import { forkJoin, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  public userDetail: any;
  public userDetailSubscription: Subscription | any;
  public news: News[] = [];

  constructor(
    private router: Router,
    private _userSharedService$: UserSharedService,
    private _newsService: NewsService,
    private _newsSharedService: NewsSharedService,
    private _toasterService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail() {
    this._userSharedService$.userInfo.subscribe(
      (user) => {
        if (!user) return;

        this.userDetail = user;
        this.combineNews();
      }
    );
  }

  combineNews() {
    this.spinner.show();

    forkJoin([this.getThirdPartNews(), this.getNews()])
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        news => {
          const news1 = news[0].articles;
          const news2 = news[1].payload;

          this.news = this.news.concat(news1, news2);
        }
      )
  }

  getThirdPartNews() {
    return this._newsService.getThirdPartNews();
  }

  getNews() {
    const params = {
      user: this.userDetail._id,
      isBookmark: false
    }
    return this._newsService.list(params);
  }

  bookmark(news: News) {
    const data = {
      user: this.userDetail._id,
      newsId: news._id,
      isBookmark: true,
      ...news
    }
    this.spinner.show();

    this._newsService
      .add(data)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        res => {
          this._toasterService.success('Success', 'News bookmarked successfully.', {closeButton: true});
        },
        (err) => this._toasterService.error('Error', err.message, {closeButton: true})
      )
  }

  newsDetail(news: News) {
    this._newsSharedService.changeNews(news);
    this.router.navigate(['/news-detail']);
  }

  ngOnDestroy(): void {
    if (this.userDetailSubscription) this.userDetailSubscription.unsubscribe();
  }
}
