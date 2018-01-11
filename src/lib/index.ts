import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FeatureFlagsService, IFeatures } from './feature-flags.service';
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
  static forRoot(features: IFeatures = {}): ModuleWithProviders {
    return {
      ngModule: NgFeatureFlagsModule,
      providers: [
        {
          provide: FeatureFlagsService,
          useFactory: () => new FeatureFlagsService(features)
        }
      ]
    };
  }
}
