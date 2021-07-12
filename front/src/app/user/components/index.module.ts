import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MenuComponents } from './menu/menu.components';
import { HeaderComponents } from './header/header.components';
import { MenuButtonComponents } from './menu-button/menu-button..components';
import { SharedModule } from '@shared/shared.module';
import { HeaderButtonComponents } from './header-button/header-button.components';

type ComponentsType =
  typeof MenuComponents |
  typeof HeaderComponents |
  typeof MenuButtonComponents |
  typeof HeaderButtonComponents;

const components : ComponentsType[] = [
  MenuComponents,
  HeaderComponents,
  MenuButtonComponents,
  HeaderButtonComponents
];

@NgModule({
  declarations: [ components ],
  imports: [ CommonModule, MatIconModule, FormsModule, SharedModule, MatTooltipModule ],
  exports: [ components ]
})
export class UserComponentsModule {}
