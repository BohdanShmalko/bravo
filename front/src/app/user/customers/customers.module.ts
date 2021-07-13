import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomersComponents } from './customers.components';
import { CustomersRoutingModule } from './customers-routing.module';
import { UserComponentsModule } from '../components/index.module';

@NgModule({
  declarations: [
    CustomersComponents
  ],
  imports: [ CustomersRoutingModule, UserComponentsModule, CommonModule, FormsModule ],
  providers: []
})
export class CustomersModule { }
