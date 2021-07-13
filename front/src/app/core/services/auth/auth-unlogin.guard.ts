import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUnloginGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(): boolean {
    if (this._authService.isLoggedIn && this._authService.getStatus !== null) return true;

    this._router.navigate([ '/auth/login' ]);
    return false;
  }

}
