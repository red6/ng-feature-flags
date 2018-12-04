import { InjectionToken } from '@angular/core';
import { IFeatures } from './feature-flags.service';

export const FEATURE_LIST = new InjectionToken<IFeatures>(
  '@red6/ng-feature-flags feature list'
);
