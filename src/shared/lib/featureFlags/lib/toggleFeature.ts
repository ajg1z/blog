import { KeysFeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from './featureFlagsManager';

interface ToggleFeaturesArg<T> {
	name: KeysFeatureFlags;
	on: () => T;
	off: () => T;
}

export const toggleFeature = <T>(arg: ToggleFeaturesArg<T>) => {
	const { name, off, on } = arg;

	if (getFeatureFlag(name)) {
		return on();
	}

	return off();
};
