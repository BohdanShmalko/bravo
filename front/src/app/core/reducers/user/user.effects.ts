import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  AddCustomersAction,
  AddCustomersErrorAction,
  ChangeCurrentPageAction,
  userActionsType
} from '@core/reducers/user/user.actions';
import { PageType } from '@core/reducers/user/user.reducers';
import { AdminCustomersService, CustomersResponse, MessageType } from '@core/services/admin/admin-customers.service';

@Injectable()
export class UserEffects {

  private changePage$: Observable<ChangeCurrentPageAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionsType.toAnotherPage),
      map((action: { payload: PageType }) => {
        this.router.navigate(['/user/' + action.payload]);
        return new ChangeCurrentPageAction(action.payload)
      })
    )
  )

  private getCustomers$: Observable<AddCustomersAction | AddCustomersErrorAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionsType.getCustomers),
      mergeMap((data: { payload: { start: number, howMany: number } }) =>
        this.adminCustomersService.getCustomers(data.payload.start, data.payload.howMany).pipe(
          map((data: CustomersResponse) => new AddCustomersAction(data)),
          catchError((error: MessageType) => of(new AddCustomersErrorAction({ message: error.message })))
        )
      )
    ))

  private getCustomersLike$: Observable<AddCustomersAction | AddCustomersErrorAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionsType.getCustomersLike),
      mergeMap((data: { payload: { start: number, howMany: number, template: string } }) =>
        this.adminCustomersService.getCustomersLike(data.payload.start, data.payload.howMany, data.payload.template)
          .pipe(
            map((data: CustomersResponse) => new AddCustomersAction(data)),
            catchError((error: MessageType) => of(new AddCustomersErrorAction({ message: error.message })))
          )
        )
      )
  )

  constructor(private actions$: Actions, private router: Router, private adminCustomersService: AdminCustomersService) {
  }
}
