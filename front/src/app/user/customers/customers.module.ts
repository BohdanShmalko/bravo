import { NgModule } from '@angular/core';

import { CustomersComponents } from './customers.components';
import { CustomersRoutingModule } from './customers-routing.module';
import { UserComponentsModule } from '../components/index.module';

@NgModule({
  declarations: [
    CustomersComponents
  ],
  imports: [ CustomersRoutingModule, UserComponentsModule ],
  providers: []
})
export class CustomersModule { }
