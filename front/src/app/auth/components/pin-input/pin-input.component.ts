import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pin-input',
  templateUrl: './pin-input.component.html',
  styleUrls: ['./pin-input.component.scss']
})
export class PinInputComponent {
  @Input('messageError') messageError: string = '';
  @Input('name') name: string = '';
  @Input('disabled') disabled: boolean = false;
  @Output() onEntered = new EventEmitter<string>()

  public firstPin: string = '';
  public secondPin: string = '';
  public focused = false;

  public onBlur(): void {
    this.focused = false;
    const pin = this.firstPin + this.secondPin;
    if(pin.length === 6){
      this.onEntered.emit(pin);
    }
  }
}
