import { Injectable } from '@angular/core';
import * as semver from 'semver/semver.js';

export interface IFeatures {
  [featureName: string]: string;
}

@Injectable()
export class FeatureFlagsService {
  constructor(private features: IFeatures = {}) {
  }

  isVersion(feature: string, versionToCheck: string): boolean {
    return semver.satisfies(this.features[feature], versionToCheck);
  }
}
