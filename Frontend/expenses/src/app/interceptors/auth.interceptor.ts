import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpClient, HttpErrorResponse
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError, filter,
  firstValueFrom,
  from,
  lastValueFrom,
  Observable,
  switchMap, take,
  throwError
} from 'rxjs';
import { TokenService } from '../services/token.service';
import {AuthService} from "../services/auth.service";
import {ApiUrls} from "../enums/api-urls";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) {}

  //todo naprawic circular dependency, oraz poprawic aby wczytywanie uzytkownika po odswiezeniu dzialalo
  //todo blad wystepuje tylko wtedy gdy w localstorage znajduje sie token i odswiezymy strone
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getTokens().access !== null) {
      request = AuthInterceptor.addAccessToken(request, this.authService.getTokens().access)
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access);
          return next.handle(AuthInterceptor.addAccessToken(request, token.access));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(AuthInterceptor.addAccessToken(request, jwt));
        }));
    }
  }

  private static addAccessToken(request: HttpRequest<unknown>, accessToken:string|null){
    if (accessToken === null)
      return request

    return request.clone({
      headers: request.headers.set("Authorization", "Bearer " + accessToken)
    })
  }

}

interface TokenResponse{
  access: string,
  refresh: string
}
