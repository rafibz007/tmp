import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginCredentials = new FormGroup({
    usernameOrEmail: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  })

  errorBox : Array<string> = []

  constructor(private authService: AuthService,private tokenService: TokenService,private router: Router) {

  }

  ngOnInit(): void {
  }

  onSubmit(form : FormGroupDirective){
    let values = form.value

    this.authService.login(values.usernameOrEmail, values.password).subscribe(
      next => {
        console.log('successful logged in')
        this.authService.setSession(next)
        this.router.navigateByUrl('/')
      },
      error => {
        this.loginCredentials.reset()
        this.errorBox = ["Błędna nazwa użytkownika/email lub hasło"]
      }
    )

  }

}
