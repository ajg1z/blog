import { createAsyncThunk } from '@reduxjs/toolkit';
import { TokenLocalStorageKey } from '@/shared/const/localStorage';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthResponse, User } from '../../types/userSchema';
import { setFeatureFlags } from '@/shared/lib/featureFlags';

export const checkAuth = createAsyncThunk<User, void, ThunkConfig<number>>('user/checkAuth', async (_, thunkApi) => {
	try {
		const { extra } = thunkApi;

		const response = await extra.privateApi.get<AuthResponse>('/check-login');

		if (!response.data || !response.data.user || !response.data.token) {
			throw new Error();
		}

		if (__ENVIRONMENT__ === 'frontend') {
			localStorage.setItem(TokenLocalStorageKey, response.data.token);
			setFeatureFlags(response.data.user.features);
		}

		return response.data.user;
	} catch (e) {
		console.log(e);
		return thunkApi.rejectWithValue(400);
	}
});
