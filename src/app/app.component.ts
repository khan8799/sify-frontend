import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserSharedService } from './services/user-shared.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sify';
  public userDetail: any;

  constructor(
    private router: Router,
    private _userService: UserService,
    private _userSharedService$: UserSharedService,
  ) { }

  ngOnInit() {
    this.getBasicinfo();
  }

  getBasicinfo() {
    if (localStorage.getItem("token") === null) {
      this.router.navigate(["/login"]);
    } else {
      this._userService.getBasicinfo().subscribe(
        (res) => {
          this.userDetail = res.payload;
          this._userSharedService$.changeUserInfo(this.userDetail);
        });
    }
  }
}
