import { NgModule } from '@angular/core';

import { LoginDigitsComponents } from './login-digits.components';
import { LoginDigitsRoutingModule } from './login-digits-routing.module';
import { AuthComponentsModule } from '../components/index.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    LoginDigitsComponents
  ],
  imports: [ LoginDigitsRoutingModule, SharedModule, AuthComponentsModule ],
  providers: []
})
export class LoginDigitsModule {
}
