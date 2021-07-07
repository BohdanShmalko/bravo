import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponents } from "./registration.components";

const routes: Routes = [
  {
    path: '', component : RegistrationComponents
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RegistrationRoutingModule { }
