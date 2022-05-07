import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, tap} from 'rxjs';
import { ApiUrls } from '../enums/api-urls';
import { TokenService } from './token.service';
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sessionStatus$ = new Subject<boolean>()
  private loggedUser$ = new BehaviorSubject<User|null>(null)

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private handler: HttpBackend
  ) {
    if (this.isLoggedIn()){
      this.reLogin()
    } else {
      //clear localStorage
      this.logout()
    }
  }

  getSessionStatus$(){
    return this.sessionStatus$.asObservable()
  }

  getLoggedUser$(){
    return this.loggedUser$.asObservable()
  }

  login(username: string, password: string) {
    return this.http.post<TokenResponse>(ApiUrls.TOKEN_URL, {username: username, password: password})
  }

  setSession(authResult: TokenResponse){
    this.tokenService.setTokens(authResult)

    this.sessionStatus$.next(true)
    this.loggedUser$.next(this.tokenService.getTokenData())
  }

  isSessionFresh(){
    return this.isLoggedIn() && this.tokenService.isAccessTokenValid()
  }

  refreshToken(){
    let headers = new HttpHeaders({
      "Content-Type" : "application/json"
    })
    return this.http.post<TokenResponse>(ApiUrls.REFRESH_TOKEN_URL, {refresh:this.tokenService.getRefreshToken()}, {headers:headers})
      .pipe(tap((tokens:TokenResponse)=>{
        this.tokenService.setTokens(tokens)
      }))
  }


  reLogin(){
    if (!this.isLoggedIn())
      return

    //bypass interceptor, in order to avoid circular dependency after page refresh
    const httpClient = new HttpClient(this.handler)

    let headers = new HttpHeaders({
      "Content-Type" : "application/json"
    })
    return httpClient.post<TokenResponse>(ApiUrls.REFRESH_TOKEN_URL, {refresh:this.tokenService.getRefreshToken()}, {headers:headers}).subscribe({
      next : value => {
        console.log("relogging...")
        this.setSession(value)
      },
      error : err => {
        console.log(err)
        this.logout()
      }
    })
  }

  logout(){
    this.tokenService.deleteTokens()
    this.sessionStatus$.next(false)
    this.loggedUser$.next(null)
  }

  register(username: string, email: string, password: string){
    return this.http.post<User>(ApiUrls.USER_URL, {username: username, email: email, password: password})
  }

  isLoggedIn(){
    return this.tokenService.isRefreshTokenValid()
  }

  getTokens(){
    return {
      access: this.tokenService.getAccessToken(),
      refresh: this.tokenService.getRefreshToken()
    }
  }

  areTokensValid(){
    return {
      access: this.tokenService.isAccessTokenValid(),
      refresh: this.tokenService.isRefreshTokenValid()
    }
  }

  TEST_isValidToken(){
    return this.tokenService.isAccessTokenValid()
  }
}

interface TokenResponse{
  access: string,
  refresh: string
}


