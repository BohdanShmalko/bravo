import { Action } from '@ngrx/store';

import { PageType } from '@core/reducers/user/user.reducers';
import { DataTableCustomers } from '../../../user/customers/customers.components';
import {CustomersResponse} from "@core/services/admin/admin-customers.service";

export enum userActionsType {
  changeMenuOpen = '[USER] change open menu status', //to reducer
  changeCurrentPage = '[USER] change current page', //to reducer
  toAnotherPage = '[USER] navigate to another page', //to effects

  getCustomers = '[USER] get customers', //to effects
  editCustomer = '[USER] edit customer', //to effects
  getCustomersLike = '[USER] get customer by template', //to effects
  addCustomers = '[USER] add new customers to state', //to reducer
  addCustomersError = '[USER] add customers error' //to reducer
}

export class ChangeMenuStatusAction implements Action {
  readonly type = userActionsType.changeMenuOpen;
}

export class ChangeCurrentPageAction implements Action {
  readonly type = userActionsType.changeCurrentPage;

  constructor(public payload: PageType) {
  }
}

export class ToAnotherPageAction implements Action {
  readonly type = userActionsType.toAnotherPage;

  constructor(public payload: PageType) {
  }
}

export class AddCustomersAction implements Action {
  readonly type = userActionsType.addCustomers;

  constructor(public payload: CustomersResponse) {
  }
}

export class GetCustomersAction implements Action {
  readonly type = userActionsType.getCustomers;

  constructor(public payload: { start: number, howMany: number }) {
  }
}

export class EditCustomerAction implements Action {
  readonly type = userActionsType.editCustomer;

  constructor(public payload: { data : DataTableCustomers }) {
  }
}

export class GetCustomersLikeAction implements Action {
  readonly type = userActionsType.getCustomersLike;

  constructor(public payload: { template: string, start: number, howMany: number }) {
  }
}

export class AddCustomersErrorAction implements Action {
  readonly type = userActionsType.addCustomersError;

  constructor(public payload: { message: string }) {
  }
}

export type UserActions =
  ChangeMenuStatusAction |
  ChangeCurrentPageAction |
  ToAnotherPageAction |
  AddCustomersAction |
  GetCustomersAction |
  EditCustomerAction |
  GetCustomersLikeAction |
  AddCustomersErrorAction;
