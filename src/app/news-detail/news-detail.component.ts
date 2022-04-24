import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { News } from '../models/News';
import { NewsSharedService } from '../services/news-shared.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  public news$: Observable<News> | undefined;
  
  constructor(
    private _newsSharedService: NewsSharedService
  ) { }

  ngOnInit(): void {
    this.news$ = this._newsSharedService.news;
  }

}
