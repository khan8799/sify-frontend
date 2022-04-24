import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsSharedService {

  private newsSource = new BehaviorSubject<any>(null);
  public news = this.newsSource.asObservable();

  constructor() {}

  changeNews(data: any) {
    this.newsSource.next(data);
  }
}
