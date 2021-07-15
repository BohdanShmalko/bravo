import { CustomButtonComponent } from '@shared/components/custom-button/custom-button.component';
import { CustomInputComponent } from '@shared/components/custom-input/custom-input.component';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { DigitsViewComponent } from '@shared/components/digits-view/digits-view.component';
import { DaysCheckerComponent } from '@shared/components/days-checker/days-checker.component';
import { CustomTextareaComponent } from '@shared/components/custom-textarea/custom-textarea.component';

export type SharedComponentsType =
  | typeof CustomButtonComponent
  | typeof CustomInputComponent
  | typeof LogoComponent
  | typeof DigitsViewComponent
  | typeof DaysCheckerComponent
  | typeof CustomTextareaComponent;

export const components: SharedComponentsType[] = [
  CustomButtonComponent,
  CustomInputComponent,
  LogoComponent,
  DaysCheckerComponent,
  CustomTextareaComponent
];

export * from '@shared/components/page-not-found/page-not-found.component';
export * from '@shared/components/custom-button/custom-button.component';
export * from '@shared/components/custom-input/custom-input.component';
export * from '@shared/components/logo/logo.component';
export * from '@shared/components/digits-view/digits-view.component';
export * from '@shared/components/days-checker/days-checker.component';
export * from '@shared/components/custom-textarea/custom-textarea.component';
