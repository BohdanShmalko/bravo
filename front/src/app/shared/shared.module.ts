import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";

import * as fromComponents from './components';


@NgModule({
  declarations: [ ...fromComponents.components ],
  imports: [ CommonModule, MatIconModule, FormsModule ],
  exports: [ ...fromComponents.components, MatIconModule ]
})
export class SharedModule {}
