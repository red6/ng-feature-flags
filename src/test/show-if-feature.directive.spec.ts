import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgFeatureFlagsModule } from '../lib';
import { IFeatures } from '../lib/feature-flags.service';

const mockFeatures: IFeatures = {
  testFeature: '1.0.0',
  testFeature2: '1.0.0'
};

@Component({ selector: 'test-cmp', template: '' })
class TestComponent {
  feature = '';
  feature2 = '';
}

function createTestComponent(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template: template }
  }).createComponent(TestComponent);
}

describe('ShowIfFeatureDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  function getComponent(): TestComponent {
    return fixture.componentInstance;
  }

  afterEach(() => {
    fixture = null;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgFeatureFlagsModule.forRoot(mockFeatures)],
      declarations: [TestComponent]
    });
  });

  it('should work in a template attribute', async(() => {
    const template = `<span *showIfFeature="'testFeature'">hello</span>`;
    fixture = createTestComponent(template);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect(fixture.nativeElement.textContent).toEqual('hello');
  }));

  it('should work on a template element', async(() => {
    const template = `<ng-template [showIfFeature]="'testFeature'">hello2</ng-template>`;
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toEqual('hello2');
  }));

  it('should handle nested showIfFeature correctly', async(() => {
    const template =
      '<div *showIfFeature="feature"><span class="test"></span><span *showIfFeature="feature2">hello</span></div>';
    fixture = createTestComponent(template);

    getComponent().feature = 'testFeature';
    getComponent().feature2 = 'testFeature2';
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span.test')).length).toEqual(
      1
    );
    expect(fixture.nativeElement.textContent).toEqual('hello');

    getComponent().feature = 'testFeature ~1.0.0';
    getComponent().feature2 = 'testFeature2 ~2.0.0';
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span.test')).length).toEqual(
      1
    );
    expect(fixture.nativeElement.textContent).toEqual('');
  }));
});
