import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { DialogData } from '../../catalog.components';
import {SnackbarService} from "@core/services/snackbar/snackbar.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-add-product.component.html',
    styleUrls: [ './edit-add-product.component.scss', '../../../styles/common_dialog.components.scss' ]
})
export class EditAddProductComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<EditAddProductComponent>,
    private snackbarService: SnackbarService
  ) {
  }

  public clickHandler(): void {

  }

  public addUnit(): void {

  }

  public deleteUnit(): void {

  }

  public openSnackbar(): void {
    this.dialogRef.close();
    if(this.data.type === 'add') this.snackbarService.open(
      'done',
      'Product Add',
      'Product was added successfully'
    )

    else this.snackbarService.open(
      'done',
      'Product Update',
      'Product was updated successfully'
    )
  }
}
