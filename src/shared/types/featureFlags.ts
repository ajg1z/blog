export interface FeatureFlags {
	isArticleRatingEnabled?: boolean;
	isProfileRatingEnabled?: boolean;
}

export type KeysFeatureFlags = keyof FeatureFlags;
