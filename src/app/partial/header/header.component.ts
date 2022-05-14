import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username = "";
  image = "";
  isLoggedIn = true;

  constructor(private router: Router) {
    const user = JSON.parse(`${localStorage.getItem("user")}`);

    if (user != null) {
      this.username = user.user_name;
      this.image = user.image;
    } else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit(): void {
  }

  logOut(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    })
  }
}
