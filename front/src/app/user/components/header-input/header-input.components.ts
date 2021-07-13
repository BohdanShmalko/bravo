import {Component, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-header-input',
  templateUrl: './header-input.component.html',
  styleUrls: [ './header-input.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HeaderInputComponents),
      multi: true
    }
  ]
})
export class HeaderInputComponents implements ControlValueAccessor {

  @Input('placeholder') placeholder: string = '';

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

  public onChange: (val: string) => void = (val: string) => {};
  public onTouched: () => void = () => {};

  public writeValue(value: string): void{
    this.value = value
  }

  public registerOnChange(fn: (val: string) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  del() {
    this.value = ''
    this.onChange('')
    this.onTouched()
  }

}
