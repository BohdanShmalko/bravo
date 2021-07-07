import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration-digits',
  templateUrl: './login-digits.component.html',
  styleUrls: [ './login-digits.component.scss' ]
})
export class LoginDigitsComponents implements OnInit{
  public pageType: 'registration' | 'login';

  constructor(private activatedRoute : ActivatedRoute, private router : Router) {
  }

  ngOnInit() {
    const typeFromUrl = this.activatedRoute.snapshot.paramMap.get('type');
    if (typeFromUrl === 'registration' || typeFromUrl === 'login')
      this.pageType = typeFromUrl;
    else this.router.navigate([ '/auth/login' ])
  }

  onEvent(event : string) {

  }
}
