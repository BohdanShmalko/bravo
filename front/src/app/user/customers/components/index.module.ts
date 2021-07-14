import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';

import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import {UserComponentsModule} from "../../components/index.module";
import {SharedModule} from "@shared/shared.module";

type ComponentsType =
  typeof AddCustomerComponent |
  typeof EditCustomerComponent;

const components : ComponentsType[] = [
  AddCustomerComponent,
  EditCustomerComponent
];

@NgModule({
  declarations: [ components ],
  imports: [
    MatDialogModule, UserComponentsModule, SharedModule
  ],
  exports: [ components ]
})
export class CustomersComponentsModule {}
