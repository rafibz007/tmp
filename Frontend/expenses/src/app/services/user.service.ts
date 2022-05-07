import {ChangeDetectorRef, Injectable} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData: any | null = null

  constructor(
    private authService: AuthService,
  ) {
    authService.getLoggedUser$().subscribe(
      next => {
        this.userData = next
      }
    )
   }

   getUserData(){
    return this.userData
   }

}
