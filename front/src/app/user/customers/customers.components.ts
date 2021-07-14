import {Component, OnInit} from '@angular/core';
import {Sort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {AddCustomerComponent} from "./components/add-customer/add-customer.component";

export interface DataTableCustomers {
  no: string,
  name: string,
  address: string,
  deliveryDays: string
}

@Component({
  selector: 'app-customer',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
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

  public set value(template: string) {
    //TODO get for template
    this.val = template;
  }

  sortData(sort: Sort) {
    const data = this.dataTable.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }

  constructor(public dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.sortedData = this.dataTable.slice();
    //TODO to load customers
    this.customersCount = 0;
  }

  public changeHowManyLoad(count: number) {
    this.howManyLoad = count
  }

  public loadPageData(startWith: number) {
    //TODO to load customers
  }

  public dialogEdit(event: DataTableCustomers) {
    console.log(event)
  }

  public addCustomer():void {
    this.dialog.open(AddCustomerComponent)
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
