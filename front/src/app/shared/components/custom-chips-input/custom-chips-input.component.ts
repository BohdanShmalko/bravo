import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-custom-chips-input',
  templateUrl: './custom-chips-input.component.html',
  styleUrls: [ './custom-chips-input.component.scss' ],
})
export class CustomChipsInputComponent implements OnInit{
  @Input('placeholder') placeholder: string = '';
  @Input('default') default?: string[] = [];
  @Input('all') all?: string[] = [];
  @Input('title') title: string = '';
  @Output('onSelect') onSelect: EventEmitter<string[]> = new EventEmitter<string[]>();

  public selectable: boolean = true;
  public removable: boolean = true;
  public fruitCtrl = new FormControl();
  public filteredFruits: Observable<string[]>;
  public usedFruits: string[] = [];
  public notUsedFruits: string[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor() {
  }

  public ngOnInit(): void {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.notUsedFruits.slice()));

    if(this.default)
      this.usedFruits = this.default;
    if(this.all)
      this.notUsedFruits = this.all;
  }

  public get getPlaceholder(): string {
    return this.usedFruits.length ? this.placeholder : this.title
  }

  public get getTitle(): string {
    return this.usedFruits.length ? this.title : ''
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    const itemIndex = this.notUsedFruits.indexOf(value);
    if (itemIndex >= 0) {
      this.usedFruits.push(value);
      this.setValue();
      this.notUsedFruits.splice(itemIndex, 1);
    }

    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  public remove(fruit: string): void {
    const index = this.usedFruits.indexOf(fruit);

    if (index >= 0) {
      this.usedFruits.splice(index, 1);
      this.setValue();
      this.notUsedFruits.push(fruit);
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    const value: string = event.option.viewValue;
    const itemIndex = this.notUsedFruits.indexOf(value);
    if (itemIndex >= 0) {
      this.usedFruits.push(value);
      this.setValue();
      this.notUsedFruits.splice(itemIndex, 1);
      this.fruitInput.nativeElement.value = '';
    }
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.notUsedFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  private setValue(): void {
    this.onSelect.emit(this.usedFruits);
  }
}
