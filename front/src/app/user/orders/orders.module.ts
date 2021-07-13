import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrdersComponents } from './orders.components';
import { OrdersRoutingModule } from './orders-routing.module';
import { UserComponentsModule } from '../components/index.module';

@NgModule({
  declarations: [
    OrdersComponents
  ],
  imports: [ OrdersRoutingModule, UserComponentsModule, CommonModule, FormsModule ],
  providers: []
})
export class OrdersModule { }
