import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';

import {
  AuthResponse,
  AuthService,
  Code,
  EmailType,
  RegistrationType,
  TokenType
} from '@core/services/auth/auth.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {
  authActionsType,
  LoginAction,
  RemoveLoginErrorAction, RemoveRegistrationErrorAction,
  SetDigitsErrorAction,
  SetLoginErrorAction, SetRegistrationErrorAction
} from '@core/reducers/auth/auth.actions';
import {Observable, of} from 'rxjs';

@Injectable()
export class AuthEffects {

  private sendLogin$: Observable<SetLoginErrorAction | RemoveLoginErrorAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActionsType.sendLogin),
      mergeMap((data : { payload: EmailType }) => this.authService.loginUser(data.payload).pipe(
        map((data: TokenType) => {
          this.authService.storeResponse({ token: data.token, status: '' } )
          this.router.navigate([ '/auth/loginDigits/login' ])
          return new RemoveLoginErrorAction()
        }),
        catchError(({error}) => of(new SetLoginErrorAction(error)))
        )
      )
    )
  )

  private checkLogin$: Observable<SetDigitsErrorAction | LoginAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActionsType.sendLoginDigits),
      mergeMap((data : { payload: Code }) => this.authService.sendLoginCode(data.payload).pipe(
        map( (data: AuthResponse) => {
          this.authService.storeResponse( data )
          this.router.navigate([ '/user/orders' ])
          return new LoginAction(data)
        }),
        catchError(({error}) => of(new SetDigitsErrorAction(error)))
      ))
    )
  )

  private sendRegistration$: Observable<SetRegistrationErrorAction | RemoveRegistrationErrorAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActionsType.sendRegistration),
      mergeMap((data : { payload: RegistrationType }) => this.authService.registrationUser(data.payload).pipe(
        map((data: TokenType) => {
          this.authService.storeResponse({ token: data.token, status: '' } )
          this.router.navigate([ '/auth/loginDigits/registration' ])
          return new RemoveRegistrationErrorAction()
        }),
        catchError(({error}) => of(new SetRegistrationErrorAction(error)))
        )
      )
    )
  )

  private checkRegistration$: Observable<SetDigitsErrorAction | LoginAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActionsType.sendRegistrationDigits),
      mergeMap((data : { payload: Code }) => this.authService.sendRegistrationCode(data.payload).pipe(
        map( (data: AuthResponse) => {
          this.authService.storeResponse( data )
          this.router.navigate([ '/user/orders' ])
          return new LoginAction(data)
        }),
        catchError(({error}) => of(new SetDigitsErrorAction(error)))
      ))
    )
  )

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {
  }
}
