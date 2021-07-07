import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: [ './custom-input.component.scss' ],
  providers : [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor{
  @Input('success') success : boolean;
  @Input('invalid') invalid : string = '';
  @Input('placeholder') placeholder : string = '';
  @Input('name') name : string = ''
  @Input('width') width : number = 400;
  @ViewChild('myInput') myInput : Input;

  public isFocused: boolean = false

  onChange: any = () => {}
  onTouched: any = () => {}

  writeValue(obj: any) {
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
