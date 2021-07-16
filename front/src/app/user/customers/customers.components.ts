import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { SortService } from '@core/services/sort/sort.service';

export interface DataTableCustomers {
  no: string,
  name: string,
  address: string,
  deliveryDays: string
}

@Component({
  selector: 'app-customer',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss', '../styles/common_page.components.scss']
})
export class CustomersComponents implements OnInit{
  public val:string = '';
  public howManyLoad: number = 5;
  public customersCount: number;
  public visibleColumns: string[] = ['no', 'name', 'address', 'deliveryDays'];
  public dataTable: DataTableCustomers[] = [
    { no: 'my no', name: 'my name 1', address: 'my address', deliveryDays: 'some days' },
    { no: 'my no', name: 'my name 3', address: 'my address', deliveryDays: 'some days' },
    { no: 'my no', name: 'my name 2', address: 'my address', deliveryDays: 'some days' }
  ]

  public sortedData: DataTableCustomers[];

  constructor(private dialog: MatDialog, private sorter: SortService) {
  }

  public set value(template: string) {
    //TODO get for template
    this.val = template;
  }

  public sortData(sort: Sort): void {
    const data = this.dataTable.slice();
    if (this.sorter.isDirectionEmpty(sort)) this.sortedData = data;
    else this.sortedData = data.sort(this.sorter.sortData(sort));
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

  public dialogEdit(event: DataTableCustomers): void {
    this.dialog.open(EditCustomerComponent, {
      data: event
    })
  }

  public addCustomer():void {
    this.dialog.open(AddCustomerComponent)
  }

}
