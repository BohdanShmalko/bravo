import { NgModule } from '@angular/core';

import { RegistrationComponents } from './registration.components';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    RegistrationComponents
  ],
  imports: [ RegistrationRoutingModule, SharedModule ],
  providers: []
})
export class RegistrationModule { }
