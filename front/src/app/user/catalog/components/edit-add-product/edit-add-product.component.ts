import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DialogData } from '../../catalog.components';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-add-product.component.html',
    styleUrls: [ './edit-add-product.component.scss', '../../../styles/common_dialog.components.scss' ]
})
export class EditAddProductComponent implements OnInit{
  public productForm: FormGroup;
  public exclusively: string[] = [];
  public replacement: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<EditAddProductComponent>,
    private snackbarService: SnackbarService,
    private fb: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    const isTypeEdit: boolean = this.data.type === 'edit';
    const units = [];
    if(isTypeEdit)
      for(let i = 0; i < this.data?.data.units.length; i++){
        units.push(this.fb.group({
          unit: [this.data?.data.units[i].unit, [Validators.required]], price: [this.data?.data.units[i].price, [Validators.required]]
        }))
      }
    else units.push(this.fb.group({
      unit: ['', [Validators.required]], price: ['', [Validators.required]]
    }))

    this.productForm = this.fb.group({
      code: [isTypeEdit ? this.data?.data.code: '', [Validators.required, Validators.maxLength(20)]],
      name: [isTypeEdit ? this.data?.data.name: '', [Validators.required, Validators.maxLength(100)]],
      units: this.fb.array(units),
      availability: [isTypeEdit ? this.data?.data.availability: '', [Validators.required]],
    })
  }

  public get units(): FormArray {
    return this.productForm.get('units') as FormArray;
  }

  public get codeError(): string {
    const code: AbstractControl | null = this.productForm.get('code');
    let error = '';
    if(code?.touched){
      if(code?.errors?.required) error += 'This field can not be empty';
      if(code?.errors?.maxlength) error += 'This field is very long';
    }
    return error;
  }

  public get nameError(): string {
    const name: AbstractControl | null = this.productForm.get('name');
    let error = '';
    if(name?.touched){
      if(name?.errors?.required) error += 'This field can not be empty';
      if(name?.errors?.maxlength) error += 'This field is very long';
    }
    return error;
  }

  public get availabilityError(): string {
    const availability: AbstractControl | null = this.productForm.get('availability');
    let error = '';
    if(availability?.touched){
      if(availability?.errors?.required) error += 'This field can not be empty'
    }
    return error;
  }

  public get getUnitError() {
    return (i: number) => {
      const unit = this.units.controls[i].get('unit');
      let error = '';
      if(unit?.touched){
        if(unit?.errors?.required) error += 'This field can not be empty'
      }
      return error;
    }
  }

  public get getPriceError() {
    return (i: number) => {
      const unit = this.units.controls[i].get('price');
      let error = '';
      if(unit?.touched){
        if(unit?.errors?.required) error += 'This field can not be empty'
      }
      return error;
    }
  }

  public addUnit(): void {
    this.units.push(this.fb.group({ unit: ['', [Validators.required]], price: ['', [Validators.required]] }));
  }

  public deleteUnit(i: number): void {
    this.units.removeAt(i);
  }

  public openSnackbar(): void {
    //this.dialogRef.close();
    console.log({ id: this.data.data.id, ...this.productForm.value, exclusively: this.exclusively, replacement: this.replacement })
    if(this.data.type === 'add') this.snackbarService.open(
      'done',
      'Product Add',
      'Product was added successfully'
    )

    else this.snackbarService.open(
      'done',
      'Product Update',
      'Product was updated successfully'
    )
  }

  public setExclusively(event: string[]): void{
    this.exclusively = event;
  }

  public setReplacement(event: string[]): void{
    this.replacement = event;
  }
}
