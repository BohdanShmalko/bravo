import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponents } from './user.components';

const routes: Routes = [
  {
    path: '', component: UserComponents, children: [
      {
        path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)
      },
      {
        path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
      },
      {
        path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { }
