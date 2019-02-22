[![Build Status](https://travis-ci.org/red6/ng-feature-flags.svg?branch=master)](https://travis-ci.org/red6/ng-feature-flags)
[![Maintainability](https://api.codeclimate.com/v1/badges/92aba9a4894d7c2f010b/maintainability)](https://codeclimate.com/github/red6/ng-feature-flags/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/92aba9a4894d7c2f010b/test_coverage)](https://codeclimate.com/github/red6/ng-feature-flags/test_coverage)
[![npm version](https://badge.fury.io/js/%40red6%2Fng-feature-flags.svg)](https://badge.fury.io/js/%40red6%2Fng-feature-flags)

## @red6/ng-feature-flags

This library lets you manage features in the frontend using a semver notation.
Inspired by [angular-feature-toggle](https://github.com/yairhaimo/angular-feature-toggle).

### Installation

```sh
npm install @red6/ng-feature-flags --save
```

### Configuration feature flags

@red6/ng-feature-flags uses a semver notation per feature and expects a configuration like this:

```js
{
    feature1: "1.5.1",
    feature2: "0.5.6"
}
```

This configuration toggles features inside the code according to their version conditions.

```text
//Example for "feature1" : "1.5.1"
//^1.0.0 - true
//~1.5.0 - true
//~1.6.0 - false
//^2 - false
//* - true
```

For more information regarding the semver notation head over to the [semver](http://semver.org/) and the [node-semver](https://github.com/npm/node-semver) sites.

### Getting Started

After installing, include `NgFeatureFlagsModule` in your application module like:

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgFeatureFlagsModule } from '@red6/ng-feature-flags';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgFeatureFlagsModule.forRoot({feature1: "1.5.1", feature2: "0.5.6"}),
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Toggle features using a directive

There are two directives you can use in order to toggle features: **show-if-feature** and **hide-if-feature**.  
Basically they act as ng-if and the opposite of ng-if. They add/remove elements from the DOM if a feature is enabled or satisfies a certain version.

```html
<!-- will  be shown if the admin feature is enabled -->
<div *showIfFeature="'admin'">
    This is the admin panel
</div>
<!-- will not be shown if the widget feature is enabled -->
<div *hideIfFeature="'widgets'">
    Widgets coming soon...
</div>
```

With a specific version:

```html
<!-- will be shown if the admin feature exists and satisfies the version ^1 -->
<div *showIfFeature="'admin ^1'">
    This is the admin panel
</div>
<!-- will be shown if the admin feature exists and satisfies the version ~2.0.1 -->
<div *showIfFeature="'admin ~2.0.1'">
    This is the NEW and improved admin panel
</div>
```

### Update features

To update features you can use the update methode on the service:

```js
@Component({ ... })
class AppComponent {
  constructor(private featureFlagsService: FeatureFlagsService) {}

  updateFeature() {
    this.featureFlagsService.updateFeatures({ feature1: "2.0.0" });
  }
}

````
