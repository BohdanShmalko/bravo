import { ActionReducer } from '@ngrx/store';

import { UserActions, userActionsType } from '@core/reducers/user/user.actions';
import { DataTableCustomers } from '../../../user/customers/customers.components';
import { DataTableProducts } from "../../../user/catalog/catalog.components";

export type UserNodeType = 'user';
export const userNode: UserNodeType = 'user';

export type PageType = 'orders' | 'catalog' | 'customers';

export interface UserState {
  currentPage: PageType,
  isOpenMenu: boolean,
  customersSize: number,
  customersError: string,
  customers: DataTableCustomers[],
  catalog: DataTableProducts[],
  customersNo: string[]
}

const initialState: UserState = {
  currentPage: 'catalog',
  isOpenMenu: true,
  customersSize: 0,
  customersError: '',
  customers: [],
  catalog: [],
  customersNo: []
};

export const userReducer: ActionReducer<UserState, UserActions> =
  (state: UserState = initialState, action: UserActions): UserState => {
    switch (action.type) {
      case userActionsType.changeCurrentPage:
        return { ...state, currentPage: action.payload }
      case userActionsType.changeMenuOpen:
        return { ...state, isOpenMenu: !state.isOpenMenu }
      case userActionsType.addCustomers:
        return { ...state, customers: action.payload.data, customersSize: action.payload.size, customersError: '' }
      case userActionsType.addCustomersError:
        return { ...state, customersError: action.payload.message }
      default:
        return state;
    }
  }
