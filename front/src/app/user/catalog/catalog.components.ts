import {Component, OnDestroy, OnInit} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder } from '@angular/forms';
import {select, State, Store} from '@ngrx/store';

import { SortService } from '@core/services/sort/sort.service';
import { EditAddProductComponent } from './components/edit-add-product/edit-add-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { ReplaceCatalogComponent } from './components/replace-catalog/replace-catalog.component';
import { DataTableCustomers } from '../customers/customers.components';
import { AuthState, StatusType } from '@core/reducers/auth/auth.reducers';
import { selectStatusAuth } from '@core/reducers/auth/auth.selectors';
import {Observable, Subscription} from "rxjs";
import {GetCustomersAction, GetCustomersLikeAction} from "@core/reducers/customers/customers.actions";
import {CatalogState} from "@core/reducers/catalog/catalog.reducers";
import {GetProductsAction, GetProductsLikeAction, SortAvailabilityAction} from "@core/reducers/catalog/catalog.actions";
import {selectCatalogSize, selectProducts} from "@core/reducers/catalog/catalog.selector";

export interface AvailabilityType {
  inStock?: boolean,
  outOfStock?: boolean,
  discontinued?: boolean
}

export interface UnitType {
  unit: string,
  price: string
}

export interface DataTableProducts {
  id ?: number,
  code: string,
  name: string,
  units: UnitType[],
  availability: AvailabilityType,
  exclusive: string[],
  replacement: string[]
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
export class CatalogComponents implements OnInit, OnDestroy{
  public val:string = '';
  public howManyLoad: number = 5;
  public activeAvailabilityFilter: boolean = false;
  public visibleColumns: string[] = ['code', 'name', 'unit', 'price', 'availability'];
  public dataTable: DataTableProducts[] = [];
  public sortedData: DataTableProducts[];
  private dataObserver: Subscription = this.catalogStorage.pipe(select(selectProducts)).subscribe((data: DataTableProducts[]) => {
    this.dataTable = data;
    this.sortedData = data;
  })
  public availabilityForm = this.fb.group({
    inStock: [false],
    outOfStock: [false],
    discontinued: [false]
  })
  public productsCount$: Observable<number> = this.catalogStorage.pipe(select(selectCatalogSize))

  private loadType: 'simple' | 'like' | 'availability' = 'simple';

  private status$: Subscription = this.authStorage.pipe(select(selectStatusAuth)).subscribe((status: StatusType) => {
    if(status === 'admin') this.visibleColumns.push('actions');
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
    if(!(template.indexOf('/') + 1)){ //!!!
      if(this.activeAvailability){
        this.loadType = 'availability';
        this.catalogStorage.dispatch(new SortAvailabilityAction({ data: this.availabilityForm.value, start: 0, howMany: this.howManyLoad, template }))
      }
      else if(template !== ''){
        this.loadType = 'like';
        this.catalogStorage.dispatch(new GetProductsLikeAction({ start: 0, howMany: this.howManyLoad, template }))
      }
      else {
        this.loadType = 'simple';
        this.catalogStorage.dispatch(new GetProductsAction({ start: 0, howMany: this.howManyLoad }))
      }
      this.val = template;
    }
  }

  sortData(sort: Sort): void {
    const data = this.dataTable.slice();
    if (this.sorter.isDirectionEmpty(sort)) this.sortedData = data;
    else this.sortedData = data.sort(this.sorter.sortData(sort));
  }

  constructor(
    public dialog: MatDialog,
    private sorter: SortService,
    private fb: FormBuilder,
    private authStorage: State<AuthState>,
    private catalogStorage: Store<CatalogState>) {
  }

  public ngOnInit(): void {
    this.sortedData = this.dataTable.slice();
    this.catalogStorage.dispatch(new GetProductsAction({ start: 0, howMany: this.howManyLoad }))
  }

  public changeHowManyLoad(count: number): void {
    this.howManyLoad = count
    if(this.loadType === 'availability')
      this.catalogStorage.dispatch(new SortAvailabilityAction({ data: this.availabilityForm.value, start: 0, howMany: count, template: this.val }))
    if(this.loadType === 'simple')
      this.catalogStorage.dispatch(new GetProductsAction({ start: 0, howMany: count }))
    if(this.loadType === 'like')
      this.catalogStorage.dispatch(new GetProductsLikeAction({ start: 0, howMany: count, template: this.val }))
  }

  public loadPageData(startWith: number): void {
    if(this.loadType === 'availability')
      this.catalogStorage.dispatch(new SortAvailabilityAction({ data: this.availabilityForm.value, start: startWith, howMany: this.howManyLoad, template: this.val }))
    if(this.loadType === 'simple')
      this.catalogStorage.dispatch(new GetProductsAction({ start: startWith, howMany: this.howManyLoad }))
    if(this.loadType === 'like')
      this.catalogStorage.dispatch(new GetProductsLikeAction({ start: startWith, howMany: this.howManyLoad, template: this.val }))
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

  public ngOnDestroy(): void {
    this.status$.unsubscribe();
    this.dataObserver.unsubscribe();
  }

  public get activeAvailability(): boolean {
    return this.inStock?.value || this.outOfStock?.value || this.discontinued?.value;
  }

  public sortByAvailability(): void {
    this.activeAvailabilityFilter = false;
    if(this.activeAvailability){
      this.loadType = 'availability';
      this.catalogStorage.dispatch(new SortAvailabilityAction({ data: this.availabilityForm.value, start: 0, howMany: this.howManyLoad, template: this.val }))
    }
  }

}
