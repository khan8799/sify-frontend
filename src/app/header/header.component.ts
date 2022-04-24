import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSharedService } from '../services/user-shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userDetail: any;

  constructor(
    private router: Router,
    private _userSharedService$: UserSharedService,
  ) { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail() {
    this._userSharedService$.userInfo.subscribe(
      (user) => (this.userDetail = user)
    );
  }

  edit() {
    this.router.navigate(['/edit-profile']);
  }

  logout() {
    window.sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

}
