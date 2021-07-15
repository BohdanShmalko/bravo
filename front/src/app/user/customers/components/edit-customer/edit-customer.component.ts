import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataTableCustomers } from '../../customers.components';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss', '../../../styles/common_dialog.components.scss']
})
export class EditCustomerComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DataTableCustomers) {
  }

  public clickHandler(): void {

  }
}
