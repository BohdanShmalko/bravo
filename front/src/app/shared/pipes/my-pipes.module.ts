import { NgModule } from '@angular/core';

import { ValidationErrorPipe } from './validation-error.pipe';

export type MyPipesType = ( typeof ValidationErrorPipe )[];

const myPipes: MyPipesType = [ ValidationErrorPipe ];

@NgModule({
  declarations: [ myPipes ],
  exports: [ myPipes ]
})
export class MyPipesModule {
}
