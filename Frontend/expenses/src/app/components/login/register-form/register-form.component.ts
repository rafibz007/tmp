import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerCredentials = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.min(3),
      Validators.max(15),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.min(3),
    ]),
  })

  errorBox: Array<string> = []

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroupDirective) {
    let values = form.value

    this.authService.register(values.username, values.email, values.password).subscribe({
      next: (user) => {
        console.log("successfull register")
      },
      error: (error) => {
        this.errorBox = ["Bład"]
      }
    })
  }

}
