import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SortService } from '@core/services/sort/sort.service';

export interface OrderData {
  orderNo: string,
  customer: string,
  customerNo: string,
  items: string,
  notes: string,
  ordered: string,
  reqDelivery: string,
  status: string
}

@Component({
  selector: 'app-root',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss', '../styles/common_page.components.scss']
})
export class OrdersComponents implements OnInit{
  public val:string = '';
  public howManyLoad: number = 5;
  public customersCount: number;
  public visibleColumns: string[] = [
    'orderNo',
    'customer',
    'customerNo',
    'items',
    'notes',
    'ordered',
    'reqDelivery',
    'status'
  ];
  public dataTable: OrderData[] = [
    {
      orderNo: 'some order no',
      customer: 'some customer',
      customerNo: 'some cust no',
      items: 'some items',
      notes: 'some notes',
      ordered: 'some ordered',
      reqDelivery: 'mon, sut, fri',
      status: 'confirm'
    }
  ]
  public activeCustomerFilter: boolean = false;

  public sortedData: OrderData[];

  constructor(private dialog: MatDialog, private sorter: SortService) {
  }

  public set value(template: string) {
    //TODO get for template
    this.val = template;
  }

  public ngOnInit(): void {
    this.sortedData = this.dataTable.slice();
    //TODO to load customers
    this.customersCount = 0;
  }

  public changeHowManyLoad(count: number): void {
    this.howManyLoad = count
  }

  public loadPageData(startWith: number): void {
    //TODO to load customers
  }

  public showAll(event: OrderData): void {

  }
}
