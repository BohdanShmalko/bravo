import { NgModule } from '@angular/core';

import { CatalogComponents } from './catalog.components';
import { CatalogRoutingModule } from './catalog-routing.module';
import { UserComponentsModule } from '../components/index.module';

@NgModule({
  declarations: [
    CatalogComponents
  ],
  imports: [ CatalogRoutingModule, UserComponentsModule ],
  providers: []
})
export class CatalogModule { }
