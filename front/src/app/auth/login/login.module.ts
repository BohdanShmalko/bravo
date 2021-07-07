import { NgModule } from '@angular/core';

import { LoginComponents } from './login.components';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [
        LoginComponents,
    ],
    imports: [ LoginRoutingModule, SharedModule ],
    providers: []
})
export class LoginModule { }
