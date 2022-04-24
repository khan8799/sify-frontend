import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage: any;
        let message = '';

        if (error.error.message) message = error.error.message;
        else if (error.error.error.message) message = error.error.error.message;

        if (error.error instanceof ErrorEvent) errorMessage = { message };
        else errorMessage = { status: error.status, message };

        if (error.error.error) errorMessage.error = error.error.error;

        return throwError(errorMessage);
      })
    );
  }
}
