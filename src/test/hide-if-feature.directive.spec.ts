import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeatureFlagsService, IFeatures } from '../lib/feature-flags.service';
import { HideIfFeatureDirective } from '../lib/hide-if-feature.directive';

const mockFeatures: IFeatures = {
  'testFeature': '1.0.0',
  'testFeature2': '1.0.0'
};

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  feature = '';
  feature2 = '';
}

function createTestComponent(template: string): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {set: {template: template}})
    .createComponent(TestComponent);
}

describe('HideIfFeatureDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  function getComponent(): TestComponent {
    return fixture.componentInstance;
  }

  afterEach(() => {
    fixture = null;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        HideIfFeatureDirective,
        TestComponent
      ],
      providers: [{
        provide: FeatureFlagsService,
        useFactory: () => new FeatureFlagsService(mockFeatures)
      }]
    });
  });

  it('should work in a template attribute', async(() => {
    const template = `<span *hideIfFeature="'testFeature'">hello</span>`;
    fixture = createTestComponent(template);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
    expect(fixture.nativeElement.textContent).toEqual('');
  }));

  it('should work on a template element', async(() => {
    const template = `<ng-template [hideIfFeature]="'testFeature'">hello2</ng-template>`;
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toEqual('');
  }));

  it('should handle nested hideIfFeature correctly', async(() => {
    const template = '<div *hideIfFeature="feature"><span class="test"></span><span *hideIfFeature="feature2">hello</span></div>';
    fixture = createTestComponent(template);

    getComponent().feature = 'testFeature';
    getComponent().feature2 = 'testFeature2';
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span.test')).length).toEqual(0);
    expect(fixture.nativeElement.textContent).toEqual('');

    getComponent().feature = 'testFeature ~2.0.0';
    getComponent().feature2 = 'testFeature2 ~1.0.0';
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span.test')).length).toEqual(1);
    expect(fixture.nativeElement.textContent).toEqual('');
  }));
});
