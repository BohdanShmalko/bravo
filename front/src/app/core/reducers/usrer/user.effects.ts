import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ChangeCurrentPageAction, userActionsType} from "@core/reducers/usrer/user.actions";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {PageType} from "@core/reducers/usrer/user.reducers";
import {map} from "rxjs/operators";

@Injectable()
export class UserEffects {

  private changePage$: Observable<ChangeCurrentPageAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionsType.toAnotherPage),
      map((action : { payload: PageType }) => {
        this.router.navigate(['/user/' + action.payload]);
        return new ChangeCurrentPageAction(action.payload)
      })
    )
  )

  constructor(private actions$: Actions, private router: Router) {
  }
}
