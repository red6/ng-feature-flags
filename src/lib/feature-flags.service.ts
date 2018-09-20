import { Injectable } from '@angular/core';
import { satisfies } from 'semver';

export interface IFeatures {
  [featureName: string]: string;
}

@Injectable()
export class FeatureFlagsService {
  constructor(private features: IFeatures = {}) {}

  isVersion(feature: string, versionToCheck: string): boolean {
    return satisfies(this.features[feature], versionToCheck);
  }
}
