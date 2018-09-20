import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { FeatureFlagsService, IFeatures } from './feature-flags.service';
import { HideIfFeatureDirective } from './hide-if-feature.directive';
import { ShowIfFeatureDirective } from './show-if-feature.directive';

const DIRECTIVES = [HideIfFeatureDirective, ShowIfFeatureDirective];

export const FEATURES = new InjectionToken<IFeatures>('FEATURES');

function featureFlagsServiceFactory(initialState) {
  return new FeatureFlagsService(initialState);
}

@NgModule({
  imports: [CommonModule],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class NgFeatureFlagsModule {
  static forRoot(features?: IFeatures): ModuleWithProviders {
    return {
      ngModule: NgFeatureFlagsModule,
      providers: [
        {
          provide: FEATURES,
          useValue: features ? features : {}
        },
        {
          provide: FeatureFlagsService,
          useFactory: featureFlagsServiceFactory,
          deps: [FEATURES]
        }
      ]
    };
  }
}
