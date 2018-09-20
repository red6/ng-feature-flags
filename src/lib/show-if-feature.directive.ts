import { NgIf, NgIfContext } from '@angular/common';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FeatureFlagsService } from './feature-flags.service';

@Directive({
  selector: '[showIfFeature]'
})
export class ShowIfFeatureDirective extends NgIf {
  @Input()
  set showIfFeature(feature: string) {
    const args = feature.split(/\s+/);
    const featureName = args[0];
    let featureVersion = '*';
    if (args.length === 2) {
      featureVersion = args[1];
    }

    this.ngIf = this.featureFlagsService.isVersion(featureName, featureVersion);
  }

  @Input()
  set showIfThenFeature(templateRef: TemplateRef<NgIfContext>) {
    this.ngIfThen = templateRef;
  }

  @Input()
  set showIfElseFeature(templateRef: TemplateRef<NgIfContext>) {
    this.ngIfElse = templateRef;
  }

  constructor(
    _viewContainer: ViewContainerRef,
    templateRef: TemplateRef<NgIfContext>,
    private featureFlagsService: FeatureFlagsService
  ) {
    super(_viewContainer, templateRef);
  }
}
