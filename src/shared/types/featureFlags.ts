export interface FeatureFlags {
	isArticleRatingEnabled?: boolean;
	isProfileRatingEnabled?: boolean;
	isAppRedesigned?: boolean;
}

export type KeysFeatureFlags = keyof FeatureFlags;
