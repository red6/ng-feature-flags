import { NgIf, NgIfContext } from '@angular/common';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FeatureFlagsService } from './feature-flags.service';

@Directive({
  selector: '[hideIfFeature]'
})
export class HideIfFeatureDirective extends NgIf {
  private feature: {
    name: string;
    version: string;
  };

  @Input()
  set hideIfFeature(feature: string) {
    const args = feature.split(/\s+/);
    const featureName = args[0];
    let featureVersion = '*';
    if (args.length === 2) {
      featureVersion = args[1];
    }

    this.feature = { name: featureName, version: featureVersion };

    this.update();
  }

  @Input()
  set hideIfThenFeature(templateRef: TemplateRef<NgIfContext>) {
    this.ngIfThen = templateRef;
  }

  @Input()
  set hideIfElseFeature(templateRef: TemplateRef<NgIfContext>) {
    this.ngIfElse = templateRef;
  }

  constructor(
    _viewContainer: ViewContainerRef,
    templateRef: TemplateRef<NgIfContext>,
    private readonly featureFlagsService: FeatureFlagsService
  ) {
    super(_viewContainer, templateRef);

    featureFlagsService.featureListChange.subscribe(() => {
      this.update();
    });
  }

  private update() {
    this.ngIf = !this.featureFlagsService.isVersion(
      this.feature.name,
      this.feature.version
    );
  }
}
