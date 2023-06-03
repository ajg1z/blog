import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthResponse, userActions } from '@/entities/User';
import { TokenLocalStorageKey } from '@/shared/const/localStorage';
import { setFeatureFlags, toggleFeature } from '@/shared/lib/featureFlags';

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<AuthResponse, LoginByUsernameProps, ThunkConfig<string>>(
	'login/loginByUsername',
	async (authData, thunkApi) => {
		try {
			const { extra } = thunkApi;

			const response = await extra.publicApi.post<AuthResponse>('/login', authData);

			if (!response.data || !response.data.user || !response.data.token) {
				throw new Error();
			}

			localStorage.setItem(TokenLocalStorageKey, response.data.token);
			setFeatureFlags(response.data.user.features);
			toggleFeature({
				name: 'isAppRedesigned',
				on() {
					document.body.classList.add('app-design-v2');
				},
				off() {
					document.body.classList.add('app');
				},
			});
			thunkApi.dispatch(userActions.setAuthData(response.data.user));
			return response.data;
		} catch (e) {
			console.log(e);
			return thunkApi.rejectWithValue('error');
		}
	},
);
