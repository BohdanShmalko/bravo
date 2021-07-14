import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { CustomersComponents } from './customers.components';
import { CustomersRoutingModule } from './customers-routing.module';
import { UserComponentsModule } from '../components/index.module';
import { CustomersComponentsModule } from './components/index.module';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    CustomersComponents
  ],
  imports: [
    CustomersRoutingModule,
    UserComponentsModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    CustomersComponentsModule
  ],
  providers: []
})
export class CustomersModule {  }
