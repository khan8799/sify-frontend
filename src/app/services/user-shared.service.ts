import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSharedService {

  private userSource = new BehaviorSubject<any>(null);
  public userInfo = this.userSource.asObservable();

  constructor() {}

  changeUserInfo(data: any) {
    this.userSource.next(data);
  }
}
