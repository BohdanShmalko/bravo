import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponents {

  constructor(private router : Router) {
  }

  clickHandler() {
    this.router.navigate([ '/auth/loginDigits/login' ])
  }
}
