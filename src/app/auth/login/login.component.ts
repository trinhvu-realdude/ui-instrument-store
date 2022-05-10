import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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

  isLoginFailed = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

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

        this.router.navigate(["/dashboard"]).then(() => {
          window.location.reload();
        });
      },
      error: err => {
        this.isLoginFailed = true;
      }
    })
  }

  exitAlert(): void {
    this.isLoginFailed = false;
  }

}
