import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder } from '@angular/forms';

import { SortService } from '@core/services/sort/sort.service';
import { EditAddProductComponent } from './components/edit-add-product/edit-add-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { ReplaceCatalogComponent } from './components/replace-catalog/replace-catalog.component';
import { DataTableCustomers } from '../customers/customers.components';

export interface DataTableProducts {
  code: string,
  name: string,
  unit: string[],
  price: string,
  availability: string,
}

export interface DialogData {
  type: string,
  data?: DataTableCustomers
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss', '../styles/common_page.components.scss']
})
export class CatalogComponents implements OnInit{
  public val:string = '';
  public howManyLoad: number = 5;
  public productsCount: number;
  public activeAvailabilityFilter: boolean = false;
  public visibleColumns: string[] = ['code', 'name', 'unit', 'price', 'availability', 'actions'];
  public dataTable: DataTableProducts[] = [
    {code: 'some code', name: 'Some Name', unit: ['kg', 'box', 'l'], price: '100$', availability: 'some text'}
  ]
  public sortedData: DataTableProducts[];
  public availabilityForm = this.fb.group({
    inStock: [false],
    outOfStock: [false],
    discontinued: [false]
  })

  public get inStock(): AbstractControl | null {
    return this.availabilityForm.get('inStock');
  }

  public get outOfStock(): AbstractControl | null {
    return this.availabilityForm.get('outOfStock');
  }

  public get discontinued(): AbstractControl | null {
    return this.availabilityForm.get('discontinued');
  }

  public set value(template: string) {
    //TODO get for template
    this.val = template;
  }

  sortData(sort: Sort): void {
    const data = this.dataTable.slice();
    if (this.sorter.isDirectionEmpty(sort)) this.sortedData = data;
    else this.sortedData = data.sort(this.sorter.sortData(sort));
  }

  constructor(public dialog: MatDialog, private sorter: SortService, private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.sortedData = this.dataTable.slice();
    //TODO to load customers
    this.productsCount = 0;
  }

  public changeHowManyLoad(count: number): void {
    this.howManyLoad = count
  }

  public loadPageData(startWith: number): void {
    //TODO to load customers
  }

  public replaceCatalog(): void {
    this.dialog.open(ReplaceCatalogComponent)
  }

  public addProduct(): void {
    this.dialog.open(EditAddProductComponent, {
      data: {
        type: 'add',
      }
    })
  }

  public dialogEdit(row: DataTableProducts): void {
    this.dialog.open(EditAddProductComponent, {
      data: {
        type: 'edit',
        data: row
      }
    })
  }

  public deleteProduct(row: DataTableProducts): void {
    this.dialog.open(DeleteProductComponent, { data: row })
  }

}
