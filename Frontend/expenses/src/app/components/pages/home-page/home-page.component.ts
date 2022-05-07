import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {HttpClient} from "@angular/common/http";
import {ApiUrls} from "../../../enums/api-urls";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  data : any | null = null

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private http: HttpClient,
    ) {
   }

  ngOnInit(): void {
  }
  logout(){
    console.log('clicked')
    this.authService.logout()
  }
  test(){
    this.http.get(ApiUrls.USER_URL + '1').subscribe({
      next: value => {
        this.data = value
      },
      error: err => {
        this.data = err
      }
    })
  }
  checkValid(){
    console.log(this.authService.TEST_isValidToken())
  }
  clear(){
    this.data = null
  }

}
