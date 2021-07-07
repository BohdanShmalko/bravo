import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent, AuthEmailComponent } from '@shared/components';

const routes: Routes = [
  {
    path: '', redirectTo: '/user', pathMatch: 'full'
  },
  {
    path: 'authEmail/:code', component : AuthEmailComponent
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path : '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
export type AppRoutingComponentsType = typeof AuthEmailComponent | typeof PageNotFoundComponent;
export const AppRoutingComponents : AppRoutingComponentsType[] = [AuthEmailComponent, PageNotFoundComponent];
