import { NgModule } from '@angular/core';

import { ValidationErrorPipe } from './validation-error.pipe';
import { BytePipe } from '@shared/pipes/byte.pipe';

export type MyPipesType = ( typeof ValidationErrorPipe | typeof BytePipe )[];

const myPipes: MyPipesType = [ ValidationErrorPipe, BytePipe ];

@NgModule({
  declarations: [myPipes],
  exports: [myPipes]
})
export class MyPipesModule {
}
