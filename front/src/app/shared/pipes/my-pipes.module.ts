import { NgModule } from '@angular/core';

import { ValidationErrorPipe } from './validation-error.pipe';
import { BytePipe } from '@shared/pipes/byte.pipe';
import { DaysPipe } from '@shared/pipes/days.pipe';

export type MyPipesType = ( typeof ValidationErrorPipe | typeof BytePipe | typeof DaysPipe )[];

const myPipes: MyPipesType = [ ValidationErrorPipe, BytePipe, DaysPipe ];

@NgModule({
  declarations: [myPipes],
  exports: [myPipes]
})
export class MyPipesModule {
}
