import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataTableProducts } from '../../catalog.components';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
    styleUrls: [ './delete-product.component.scss', '../../../styles/common_dialog.components.scss' ]
})
export class DeleteProductComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DataTableProducts) {
  }

  public clickHandler(): void {

  }
}
