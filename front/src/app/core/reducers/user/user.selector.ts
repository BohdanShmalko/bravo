import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';

import { userNode, UserState, PageType } from './user.reducers';
import {DataTableCustomers} from "../../../user/customers/customers.components";

export type UserFeatureType = MemoizedSelector<object, UserState, DefaultProjectorFn<UserState>>;
export type PageSelectorType = MemoizedSelector<object, PageType, DefaultProjectorFn<PageType>>;
export type IsOpenSelectorType = MemoizedSelector<object, boolean, DefaultProjectorFn<boolean>>;
export type DataCustomersSelectorType = MemoizedSelector<object, DataTableCustomers[], DefaultProjectorFn<DataTableCustomers[]>>;
export type SizeType = MemoizedSelector<object, number, DefaultProjectorFn<number>>;

export const selectorUserFeature: UserFeatureType = createFeatureSelector<UserState>( userNode );

export const selectCurrentPage: PageSelectorType = createSelector( selectorUserFeature,
  (state: UserState): PageType => state.currentPage);

export const selectIsOpenMenu: IsOpenSelectorType = createSelector( selectorUserFeature,
  (state: UserState): boolean => state.isOpenMenu);

export const selectCustomers: DataCustomersSelectorType = createSelector( selectorUserFeature,
  (state: UserState): DataTableCustomers[] => state.customers);

export const selectCustomersSize: SizeType = createSelector( selectorUserFeature,
  (state: UserState): number => state.customersSize);
