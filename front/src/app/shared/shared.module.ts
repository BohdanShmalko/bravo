import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import * as fromComponents from './components';

@NgModule({
  declarations: [ ...fromComponents.components ],
  imports: [ CommonModule, MatIconModule, FormsModule, ReactiveComponentModule, MatCheckboxModule ],
  exports: [ ...fromComponents.components, MatIconModule ]
})
export class SharedModule {}
