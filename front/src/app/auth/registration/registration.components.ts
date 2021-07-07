import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.scss' ]
})
export class RegistrationComponents {
  constructor(private router : Router) {
  }

  clickHandler() {
    this.router.navigate([ '/auth/loginDigits/registration' ])
  }
}
