import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: [ './custom-input.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input('success') success: boolean;
  @Input('invalid') invalid: string = '';
  @Input('placeholder') placeholder: string = '';
  @Input('name') name: string = ''
  @Input('type') type: string = 'text';

  public isFocused: boolean = false

  setFocus() {
    this.isFocused = true
    this.onTouched()
  }
  public val: string = '';

  set value(val : string) {
    if (val !== undefined && this.val !== val) {
      this.val = val
      this.onChange(val)
      this.onTouched()
    }
  }


  public onChange: (val: string) => void;
  public onTouched: () => void;

  public writeValue(value: string): void{
    this.value = value
  }

  public registerOnChange(fn: (val: string) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}
