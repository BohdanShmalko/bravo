import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataTableCustomers } from '../../customers.components';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss', '../../../styles/common_dialog.components.scss']
})
export class EditCustomerComponent {
  public customerForm = this.fb.group({
    id: [this.data.id],
    no: [this.data.no],
    name: [this.data.name],
    address: [this.data.address],
    deliveryDays: [this.data.deliveryDays]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: DataTableCustomers, private fb: FormBuilder) {
  }

  public saveData(): void {
    console.log(this.customerForm.value)
  }
}
