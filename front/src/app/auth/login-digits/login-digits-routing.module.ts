import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginDigitsComponents } from './login-digits.components';

const routes: Routes = [
  {
    path: '', component: LoginDigitsComponents
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LoginDigitsRoutingModule { }
