import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username = "";
  image = "";
  isLoggedIn = false;

  constructor() { }

  ngOnInit(): void {
    const user = JSON.parse(`${localStorage.getItem("user")}`);
    this.username = user.user_name;
    this.image = user.image;

    if (this.username == null) {
      this.isLoggedIn = true;
    }
  }

}
