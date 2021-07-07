import { NgModule } from '@angular/core';

import { OrdersComponents } from './orders.components';
import { OrdersRoutingModule } from './orders-routing.module';
import { UserComponentsModule } from '../components/index.module';

@NgModule({
  declarations: [
    OrdersComponents
  ],
  imports: [ OrdersRoutingModule, UserComponentsModule ],
  providers: []
})
export class OrdersModule { }
