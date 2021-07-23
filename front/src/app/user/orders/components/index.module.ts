import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserComponentsModule } from '../../components/index.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';

import { TableOrdersRowComponents } from './table-orders-row/table-orders-row.components';
import { TableOrdersComponents } from './table-orders/table-orders.components';
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";

type ComponentsType =
  typeof TableOrdersRowComponents |
  typeof TableOrdersComponents;

const components : ComponentsType[] = [
  TableOrdersRowComponents,
  TableOrdersComponents
];

@NgModule({
  declarations: [ components ],
  imports: [
    MatListModule, MatExpansionModule,
    MatIconModule, CommonModule,
    UserComponentsModule, MatDatepickerModule,
    MatMenuModule, MatNativeDateModule, MatCheckboxModule
  ],
  exports: [ components ]
})
export class OrdersComponentsModule {}
