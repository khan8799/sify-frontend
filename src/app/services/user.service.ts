import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  login(data: any): Observable<any> {
    return this.http.post<any>('user/login', data);
  }

  getBasicinfo(): Observable<any> {
    return this.http.get<any>('user/getBasicinfo');
  }

  add(data: any): Observable<any> {
    return this.http.post<any>('user', data);
  }

  edit(params: any, data: any): Observable<any> {
    return this.http.put<any>('user', data, { params });
  }
}
