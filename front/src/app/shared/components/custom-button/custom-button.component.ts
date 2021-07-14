import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: [ './custom-button.component.scss' ]
})
export class CustomButtonComponent {
  @Input('disabled') disabled : boolean;
  @Input('icon') icon ?: string;
  @Input('color') color : 'blue' | 'red' | 'invisible' = 'blue';
  @Input('text') text : string = '';
  @Output() onClick = new EventEmitter<MouseEvent>()

  clickButton(event: MouseEvent) {
    if (!this.disabled){
      this.onClick.emit(event)
    }
  }
}
