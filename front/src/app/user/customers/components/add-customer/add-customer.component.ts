import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  @Input('name') name: string;

  constructor() {
  }

  public clickHandler(): void {

  }
}
