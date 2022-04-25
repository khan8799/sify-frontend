import { NewsSharedService } from './services/news-shared.service';
import { NewsService } from './services/news.service';
import { UserSharedService } from './services/user-shared.service';
import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { NewsComponent } from './news/news.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { SessionInterceptor } from './interceptor/session.interceptor';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    NewsComponent,
    BookmarkComponent,
    NewsAddComponent,
    NewsDetailComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionInterceptor,
      multi: true,
    },
    UserService,
    UserSharedService,
    NewsService,
    NewsSharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
