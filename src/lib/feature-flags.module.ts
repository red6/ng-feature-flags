import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FeatureFlagsService, IFeatures } from './feature-flags.service';
import { HideIfFeatureDirective } from './hide-if-feature.directive';
import { ShowIfFeatureDirective } from './show-if-feature.directive';
import { FEATURE_LIST } from './token';

export function featureFlagsServiceFactory(initialState) {
  return new FeatureFlagsService(initialState);
}

@NgModule({
  imports: [CommonModule],
  declarations: [HideIfFeatureDirective, ShowIfFeatureDirective],
  exports: [HideIfFeatureDirective, ShowIfFeatureDirective]
})
export class NgFeatureFlagsModule {
  static forRoot(features?: IFeatures): ModuleWithProviders {
    return {
      ngModule: NgFeatureFlagsModule,
      providers: [
        {
          provide: FEATURE_LIST,
          useValue: features ? features : {}
        },
        {
          provide: FeatureFlagsService,
          useFactory: featureFlagsServiceFactory,
          deps: [FEATURE_LIST]
        }
      ]
    };
  }
}
