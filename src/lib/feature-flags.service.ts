import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { satisfies } from 'semver';
import { FEATURE_LIST } from './token';

export interface IFeatures {
  [featureName: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  public featureListChange: Subject<void> = new Subject<void>();

  private featureList: IFeatures;

  constructor(@Inject(FEATURE_LIST) readonly features: IFeatures) {
    this.featureList = { ...features };
  }

  updateFeatures(features: IFeatures): void {
    this.featureList = { ...this.featureList, ...features };
    this.featureListChange.next();
  }

  isVersion(feature: string, versionToCheck: string): boolean {
    return satisfies(this.featureList[feature], versionToCheck);
  }
}
