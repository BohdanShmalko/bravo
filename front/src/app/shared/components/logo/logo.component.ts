import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <img [ngStyle]="{ height: height + 'px' }" [src]="logoPath">
  `
})
export class LogoComponent implements OnInit{
  @Input('isFull') isFull : boolean;
  @Input('height') height : string = '40';
  public logoPath: string = ''

  public ngOnInit(): void {
    this.isFull ? this.logoPath = 'assets/fullLogo.png' : this.logoPath = 'assets/logo.png'
  }
}
