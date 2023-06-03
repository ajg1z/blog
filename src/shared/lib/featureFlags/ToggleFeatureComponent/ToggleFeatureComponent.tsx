import { FC } from 'react';
import { getFeatureFlag } from '../featureFlagsManager';
import { KeysFeatureFlags } from '@/shared/types/featureFlags';

interface ToggleFeaturesComponentProps {
	name: KeysFeatureFlags;
	on: JSX.Element;
	off: JSX.Element;
}

export const ToggleFeatureComponent: FC<ToggleFeaturesComponentProps> = (props): JSX.Element => {
	const { name, off, on } = props;

	if (getFeatureFlag(name)) {
		return on;
	}

	return off;
};
