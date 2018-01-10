[![Build Status](https://img.shields.io/travis/red6/ng-feature-flags/master.svg?style=flat-square)](https://travis-ci.org/red6/ng-feature-flags)
[![npm](https://img.shields.io/npm/v/red6/ng-feature-flags.svg?style=flat-square)](https://www.npmjs.com/package/red6/ng-feature-flags)

## @red6/ng-feature-flags

This library lets you manage features in the frontend using a semver notation.
Inspired by [angular-feature-toggle](https://github.com/yairhaimo/angular-feature-toggle).

### Installation

```sh
npm install @red6/ng-feature-flags --save
```

### Configuration

@red6/ng-feature-flags uses a semver notation per feature and expects a configuration like this:

```js
{
    "feature1": "1.5.1",
    "feature2": "0.5.6"
}
```

This configuration toggles features inside the code according to their version conditions.

```
//Example for "feature1" : "1.5.1"
//^1.0.0 - true
//~1.5.0 - true
//~1.6.0 - false
//^2 - false
//* - true
```

For more information regarding the semver notation head over to the [semver](http://semver.org/) and the [node-semver](https://github.com/npm/node-semver) sites.

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
<div *showIfFeature="admin ^1">
    This is the admin panel
</div>
<!-- will be shown if the admin feature exists and satisfies the version ~2.0.1 -->
<div *showIfFeature="admin ~2.0.1">
    This is the NEW and improved admin panel
</div>
```
