import { DESIGN_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { FeatureFlags } from '@/shared/types/featureFlags';

let featureFlags: FeatureFlags = {
	isArticleRatingEnabled: false,
	isProfileRatingEnabled: false,
	isAppRedesigned: localStorage.getItem(DESIGN_STORAGE_THEME_KEY) === 'app-design-v2',
};

export const getFeatureFlag = (key: keyof FeatureFlags): boolean => !!featureFlags[key];
export const getFeatureAllFlags = () => featureFlags;

export const setFeatureFlags = (value?: FeatureFlags) => {
	if (value) {
		featureFlags = value;
	}
};
