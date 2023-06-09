import { createAsyncThunk } from '@reduxjs/toolkit';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getFeatureAllFlags } from '../lib/featureFlagsManager';

interface UpdateFeatureFlagsArg {
	userId: number;
	features: Partial<FeatureFlags>;
}

export const updateFeatureFlags = createAsyncThunk<void, UpdateFeatureFlagsArg, ThunkConfig<string>>(
	'user/saveJsonSettings',
	async ({ features, userId }, thunkApi) => {
		const { dispatch } = thunkApi;

		try {
			await dispatch(
				updateFeatureFlagsMutation({
					userId,
					features: {
						...getFeatureAllFlags(),
						...features,
					},
				}),
			);
		} catch (e) {
			console.log(e);
		}
	},
);
