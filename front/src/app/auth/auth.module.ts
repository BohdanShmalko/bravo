import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './auth-routing.module';
import { AuthComponents } from './auth.components';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [
        AuthComponents,
    ],
    imports: [ UserRoutingModule, MatIconModule, FormsModule, CommonModule, SharedModule ],
    providers: []
})
export class AuthModule { }
