import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = "http://localhost:5000/api/v1"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  redirectUrl: string | null = null;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    this.isLoggedIn = true;
    return this.http.post<any>(BASE_URL + "/login", {
      email: email,
      password: password
    });
  }
}
