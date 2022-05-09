import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: "",
    password: ""
  });

  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password).subscribe({
      next: data => {
        const user = data.user;
        const accessToken = data.access_token;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", accessToken);

        this.isLoggedIn = true;
      },
      error: err => {
        console.log(err);
        this.isLoginFailed = true;
      }
    })
  }

}
