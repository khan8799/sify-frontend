import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from '../models/News';
import { NewsService } from '../services/news.service';
import { UserSharedService } from '../services/user-shared.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {
  public userDetail: any;
  public userDetailSubscription: Subscription | any;
  public news: News[] = [];

  constructor(
    private _userSharedService$: UserSharedService,
    private _newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail() {
    this._userSharedService$.userInfo.subscribe(
      (user) => {
        if (!user) return;
        this.userDetail = user;
        this.getNews();
      }
    );
  }

  getNews() {
    const params = {
      isBookmark: true
    }

    this._newsService
      .list(params)
      .subscribe(
        news => {
          this.news = news.payload;
        }
      )
  }

  ngOnDestroy(): void {
    if (this.userDetailSubscription) this.userDetailSubscription.unsubscribe();
  }

}
