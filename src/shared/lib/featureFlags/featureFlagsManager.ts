import { FeatureFlags } from '@/shared/types/featureFlags';

let featureFlags: FeatureFlags = {
	isArticleRatingEnabled: false,
	isProfileRatingEnabled: false,
	isAppRedesigned: false,
};

export const getFeatureFlag = (key: keyof FeatureFlags): boolean => !!featureFlags[key];

export const setFeatureFlags = (value?: FeatureFlags) => {
	if (value) {
		featureFlags = value;
	}
};
