import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-email',
  templateUrl: './auth-email.component.html',
  styleUrls: [ './auth-email.component.scss' ]
})
export class AuthEmailComponent implements OnInit{

  public code ?: string;

  constructor(private activatedRoute : ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.paramMap.get('code')?.slice(0,6);
  }
}
