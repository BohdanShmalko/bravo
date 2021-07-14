import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '@core/reducers/user/user.reducers';
import { ChangeMenuStatusAction } from '@core/reducers/user/user.actions';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.scss']
})
export class CustomPaginatorComponents implements OnInit{
  @Input('itemsInPage') itemsInPage: number = 0;
  @Input('itemsCount') itemsCount: number = 0;
  @Output('onChangeOption') onChangeOption: EventEmitter<number> = new EventEmitter<number>();
  @Output('onQuickBack') onQuickBack: EventEmitter<number> = new EventEmitter<number>();
  @Output('onQuickForward') onQuickForward: EventEmitter<number> = new EventEmitter<number>();
  @Output('onBack') onBack: EventEmitter<number> = new EventEmitter<number>();
  @Output('onForward') onForward: EventEmitter<number> = new EventEmitter<number>();

  public itemsSize: number = 5;
  public blockCount: number = 1;
  public currentBlock: number = 1;
  public optionsPage: number[] = [ 5, 10, 20, 50, 100 ]

  public set itemsSizeSet(size: number) {
    this.itemsSize = size;
    this.blockCount = Math.ceil(this.itemsCount / size);
    this.onChangeOption.emit(size);
  }

  constructor() {
  }

  public firstPage():void {
    if (this.currentBlock !== 1) {
      this.currentBlock = 1;
      this.onQuickBack.emit(0)
    }
  }

  public backPage():void {
    if (this.currentBlock !== 1) {
      this.currentBlock--;
      let startWith: number = this.itemsSize * (this.currentBlock - 1);
      this.onForward.emit(startWith);
    }
  }

  public nextPage():void {
    if (this.currentBlock !== this.blockCount) {
      let startWith: number = this.itemsSize * this.currentBlock;
      this.currentBlock++;
      this.onForward.emit(startWith);
    }
  }

  public lastPage():void {
    if (this.currentBlock !== this.blockCount) {
      this.currentBlock = this.blockCount;
      let startWith: number = this.itemsCount - this.itemsSize;
      this.onForward.emit(startWith);
    }
  }

  ngOnInit():void {
    this.blockCount = Math.ceil(this.itemsCount / this.itemsSize);
  }

}
