import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { NewsComponent } from './news/news.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'bookmark',
    component: BookmarkComponent
  },
  {
    path: 'news-add',
    component: NewsAddComponent
  },
  {
    path: 'news-detail',
    component: NewsDetailComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
