import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient,
  ) { }

  getThirdPartNews(): Observable<any> {
    return this.http.get<any>('third-party-news');
  }

  add(data: any) {
    return this.http.post<any>('news', data);
  }

  list(params: any) {
    return this.http.get<any>('news', { params });
  }
}
