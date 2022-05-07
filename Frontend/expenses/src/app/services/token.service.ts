import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {ApiUrls} from "../enums/api-urls";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  ACCESS_TOKEN_ID = 'access_token'
  REFRESH_TOKEN_ID = 'refresh_token'
  helper = new JwtHelperService()

  constructor(

  ) {

   }

  isAccessTokenValid(){
    let token = this.getAccessToken()
    if(token !== null){
      return !this.helper.isTokenExpired(token)
    }
    return false
  }

  isRefreshTokenValid(){
    let token = this.getRefreshToken()
    if(token !== null){
      return !this.helper.isTokenExpired(token)
    }
    return false
  }

  setTokens(token: {access: string, refresh: string}){
    this.deleteTokens()

    localStorage.setItem(this.ACCESS_TOKEN_ID, token.access);
    localStorage.setItem(this.REFRESH_TOKEN_ID, token.refresh);
  }

  deleteTokens(){
    localStorage.removeItem(this.ACCESS_TOKEN_ID);
    localStorage.removeItem(this.REFRESH_TOKEN_ID);
  }

  getAccessToken(){
    return localStorage.getItem(this.ACCESS_TOKEN_ID)
  }

  getRefreshToken(){
    return localStorage.getItem(this.REFRESH_TOKEN_ID)
  }

  getTokenData(){
    if(this.isAccessTokenValid()){
      let decoded = this.helper.decodeToken(this.getAccessToken()!)
      return {
        id : decoded.user_id,
        username : decoded.username,
        email : decoded.email,
      }
    }
    return null
  }

}
