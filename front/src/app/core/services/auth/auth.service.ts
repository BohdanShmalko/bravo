import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {DaysType} from '@shared/components';

export interface EmailType {
  email: string,
}

export interface AuthResponse {
  token: string,
  status: string
}

export interface TokenType {
  token : string
}

export interface RegistrationType {
  email: string,
  name: string,
  address: string,
  contactName: string,
  deliveryDays: DaysType,
  mobilePhone?: string,
  no: string
}

export interface Code {
  secretKey: string
}

export interface Error {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _basicURL = 'http://localhost:3001/auth/';
  private _registrationURL = this._basicURL + 'sendRegistration';
  private _loginURL = this._basicURL + 'sendLogin';
  private _sendLoginCodeURL = this._basicURL + 'login';
  private _sendRegistrationCodeURL = this._basicURL + 'register';
  private _TOKEN = 'token';
  private _STATUS = 'status';

  constructor( private http: HttpClient ) {
  }

  registrationUser( user: RegistrationType ): Observable< TokenType > {
    return this.http.post< TokenType >( this._registrationURL, user )
  }

  loginUser( user: EmailType ): Observable< TokenType > {
    return this.http.post< TokenType >( this._loginURL, user )
  }

  sendLoginCode( secretKey: Code ): Observable< AuthResponse > {
    return this.http.post< AuthResponse >( this._sendLoginCodeURL, secretKey )
  }

  sendRegistrationCode( secretKey: Code ): Observable< AuthResponse > {
    return this.http.post< AuthResponse >( this._sendRegistrationCodeURL, secretKey )
  }

  storeResponse( data: AuthResponse ): void {
    localStorage.setItem(this._TOKEN, data.token)
    localStorage.setItem(this._STATUS, data.status)
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this._TOKEN)
  }

  get getToken(): string | null {
    return localStorage.getItem(this._TOKEN)
  }

  get getStatus(): string | null {
    return localStorage.getItem(this._STATUS)
  }

  logoutUser(): void {
    localStorage.removeItem(this._TOKEN)
    localStorage.removeItem(this._STATUS)
  }
}