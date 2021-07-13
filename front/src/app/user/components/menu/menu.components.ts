import { Component, Input } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {PageType, UserState} from "@core/reducers/usrer/user.reducers";
import {Observable} from "rxjs";
import {selectCurrentPage, selectIsOpenMenu} from "@core/reducers/usrer/user.selector";
import { ToAnotherPageAction } from "@core/reducers/usrer/user.actions";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.scss' ]
})
export class MenuComponents {
  public currentPage$ : Observable<PageType> = this.storage$.pipe(select(selectCurrentPage))

  public isOpenMenu$ : Observable<boolean> = this.storage$.pipe(select(selectIsOpenMenu))

  constructor(private storage$: Store<UserState>) {
  }

  public toCatalog() {
    this.storage$.dispatch(new ToAnotherPageAction('catalog'))
  }

  public toOrders() {
    this.storage$.dispatch(new ToAnotherPageAction('orders'))
  }

  public toCustomers() {
    this.storage$.dispatch(new ToAnotherPageAction('customers'))
  }

}
