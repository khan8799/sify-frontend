import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private API_URL = environment.API_URL;
  private NEWS_API_URL = environment.NEWS_API_URL;
  private CORS = environment.cors;
  private token: any;
  private AUTH_HEADER = 'Authorization';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.setUrl(req);

    req = this.addAuthenticationToken(req);

    return next.handle(req);
  }

  private setUrl(req: HttpRequest<any>): HttpRequest<any> {
    let url = this.API_URL + req.url;

    const arr1 = [
      'third-party-news',
    ];
    const exist1 = arr1.filter((val: string) => req.url.indexOf(val) !== -1);

    if (exist1.length > 0) {
      url = this.NEWS_API_URL;
    }

    return req.clone({ url });
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    this.token = localStorage.getItem('token');
    if (this.token === null) return request;

    return request.clone({ headers: request.headers.set(this.AUTH_HEADER, this.token) });
  }

}
