import {Component, Input} from '@angular/core';
import {OrderData} from "../../orders.components";

@Component({
  selector: 'app-table-orders-row',
  templateUrl: './table-orders-row.component.html',
  styleUrls: ['./table-orders-row.component.scss']
})
export class TableOrdersRowComponents {
  @Input('data') data: OrderData;
  public isOpen: boolean = false;

}
