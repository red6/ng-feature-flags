import { TestBed } from '@angular/core/testing';
import { NgFeatureFlagsModule } from '../lib/feature-flags.module';
import { FeatureFlagsService, IFeatures } from '../lib/feature-flags.service';

const mockFeatures: IFeatures = {
  testFeature: '1.0.0'
};

describe('FeatureFlagsService', () => {
  let featureFlagsService: FeatureFlagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgFeatureFlagsModule.forRoot(mockFeatures)]
    });

    featureFlagsService = TestBed.get(FeatureFlagsService);
  });

  it('should be created', () => {
    expect(featureFlagsService).toBeTruthy();
  });

  describe('isVersion()', () => {
    it('should handle semver correctly', () => {
      expect(featureFlagsService.isVersion('testFeature', '*')).toEqual(true);
      expect(featureFlagsService.isVersion('testFeature', '1.x')).toEqual(true);
      expect(featureFlagsService.isVersion('testFeature', '~2.0.0')).toEqual(
        false
      );

      expect(featureFlagsService.isVersion('notExistingFeature', '*')).toEqual(
        false
      );
    });
  });

  describe('updateFeatures()', () => {
    it('should add features correctly', () => {
      expect(featureFlagsService.isVersion('testFeature', '*')).toEqual(true);
      expect(featureFlagsService.isVersion('newTestFeature', '*')).toEqual(
        false
      );

      featureFlagsService.updateFeatures({ newTestFeature: '1.0.0' });

      expect(featureFlagsService.isVersion('testFeature', '*')).toEqual(true);
      expect(featureFlagsService.isVersion('newTestFeature', '*')).toEqual(
        true
      );
    });

    it('should update features correctly', () => {
      expect(featureFlagsService.isVersion('testFeature', '1.x')).toEqual(true);
      expect(featureFlagsService.isVersion('testFeature', '2.x')).toEqual(
        false
      );

      featureFlagsService.updateFeatures({ testFeature: '2.0.0' });

      expect(featureFlagsService.isVersion('testFeature', '1.x')).toEqual(
        false
      );
      expect(featureFlagsService.isVersion('testFeature', '2.x')).toEqual(true);
      expect(featureFlagsService.isVersion('testFeature', '3.x')).toEqual(
        false
      );
    });
  });
});
