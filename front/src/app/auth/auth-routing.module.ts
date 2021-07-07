import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponents } from './auth.components';

const routes: Routes = [
  {
    path: '', component: AuthComponents, children: [
      {
        path: 'login', loadChildren: () => import('./login/login.module')
          .then(m => m.LoginModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('./registration/registration.module')
          .then(m => m.RegistrationModule)
      },
      {
        path: 'loginDigits/:type', loadChildren: () => import('./login-digits/login-digits.module')
          .then(m => m.LoginDigitsModule)
      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule {
}
