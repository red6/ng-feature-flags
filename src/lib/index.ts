import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FeatureFlagsService } from './feature-flags.service';
import { HideIfFeatureDirective } from './hide-if-feature.directive';
import { ShowIfFeatureDirective } from './show-if-feature.directive';

const DIRECTIVES = [
  HideIfFeatureDirective,
  ShowIfFeatureDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...DIRECTIVES
  ],
  exports: [
    ...DIRECTIVES
  ]
})
export class NgFeatureFlagsModule {
  static forRoot(): ModuleWithProviders {
    return {ngModule: NgFeatureFlagsModule, providers: [FeatureFlagsService]};
  }
}
