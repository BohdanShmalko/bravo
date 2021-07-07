import { CustomButtonComponent } from '@shared/components/custom-button/custom-button.component';
import { CustomInputComponent } from "@shared/components/custom-input/custom-input.component";
import { LogoComponent } from "@shared/components/logo/logo.component";

export type SharedComponentsType =
  | typeof CustomButtonComponent
  | typeof CustomInputComponent
  | typeof LogoComponent

export const components: SharedComponentsType[] = [
  CustomButtonComponent,
  CustomInputComponent,
  LogoComponent
];

export * from '@shared/components/page-not-found/page-not-found.component';
export * from '@shared/components/custom-button/custom-button.component';
export * from "@shared/components/custom-input/custom-input.component";
export * from "@shared/components/logo/logo.component";
export * from '@shared/components/auth-email/auth-email.component'
