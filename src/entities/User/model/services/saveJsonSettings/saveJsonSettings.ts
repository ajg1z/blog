import { createAsyncThunk } from '@reduxjs/toolkit';
import { JsonSettings } from '../../types/jsonSettings';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserData } from '../../selectors/getUserData/getUserData';
import { getJsonSettings } from '../../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../../../api/userApi';

export const saveJsonSettings = createAsyncThunk<JsonSettings, JsonSettings, ThunkConfig<number>>(
	'user/saveJsonSettings',
	async (newJsonSettings, thunkApi) => {
		try {
			const { getState, dispatch } = thunkApi;

			const userData = getUserData(getState());
			const currentSettings = getJsonSettings(getState());

			if (!userData || !currentSettings) {
				return thunkApi.rejectWithValue(400);
			}

			const response = await dispatch(
				setJsonSettingsMutation({
					userId: String(userData.id),
					jsonSettings: {
						...currentSettings,
						...newJsonSettings,
					},
				}),
			).unwrap();

			if (!response.jsonSettings) {
				return thunkApi.rejectWithValue(400);
			}

			return response.jsonSettings;
		} catch (e) {
			console.log(e);
			return thunkApi.rejectWithValue(400);
		}
	},
);
