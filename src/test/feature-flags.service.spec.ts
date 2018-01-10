import { TestBed } from '@angular/core/testing';
import { FeatureFlagsService, IFeatures } from '../lib/feature-flags.service';

const mockFeatures: IFeatures = {
  'testFeature': '1.0.0'
};

describe('FeatureFlagsService', () => {
  let featureFlagsService: FeatureFlagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: FeatureFlagsService,
        useFactory: () => new FeatureFlagsService(mockFeatures)
      }]
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
      expect(featureFlagsService.isVersion('testFeature', '~2.0.0')).toEqual(false);

      expect(featureFlagsService.isVersion('notExistingFeature', '*')).toEqual(false);
    });
  });
});
