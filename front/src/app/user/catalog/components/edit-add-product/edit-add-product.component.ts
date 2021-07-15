import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import {DialogData} from "../../catalog.components";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-add-product.component.html',
    styleUrls: [ './edit-add-product.component.scss', '../../../styles/common_dialog.components.scss' ]
})
export class EditAddProductComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  public clickHandler(): void {

  }

  public addUnit(): void {

  }

  public deleteUnit(): void {

  }
}
