import {Component, Input} from '@angular/core';
import {OrderData} from "../../orders.components";

@Component({
  selector: 'app-table-orders',
  templateUrl: './table-orders.component.html',
  styleUrls: ['./table-orders.component.scss']
})
export class TableOrdersComponents {
  @Input('data') data: OrderData[] = [];
}
