import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm: ""
  });

  errorEmailExisted = false;
  errorUsernameExisted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    const user: User = {
      id: '',
      username: this.registerForm.value.username,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phone: '',
      province: '',
      image: ''
    }

    this.authService.register(user).subscribe({
      next: data => {
        console.log(data);
        
      },
      error: err => {
        if (err.error.msg == "Username already existed") {
          this.errorUsernameExisted = true
        }

        if (err.error.msg == "Email already existed") {
          this.errorEmailExisted = true;
        }
      }
    });
  }
}
