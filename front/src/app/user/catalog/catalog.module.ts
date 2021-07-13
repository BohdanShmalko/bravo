import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import { CatalogComponents } from './catalog.components';
import { CatalogRoutingModule } from './catalog-routing.module';
import { UserComponentsModule } from '../components/index.module';

@NgModule({
  declarations: [
    CatalogComponents
  ],
  imports: [ CatalogRoutingModule, UserComponentsModule, CommonModule, FormsModule ],
  providers: []
})
export class CatalogModule { }
