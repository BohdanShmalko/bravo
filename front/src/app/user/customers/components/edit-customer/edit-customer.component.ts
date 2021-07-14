import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent {
  @Input('name') name: string;

  constructor() {
  }

  public clickHandler(): void {

  }
}
