import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from 'entities/User';
import { TokenLocalStorageKey } from 'shared/const/localStorage';
import { AuthResponse } from '../../types/loginSchema';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    AuthResponse,
    LoginByUsernameProps,
    ThunkConfig<number>
>('login/loginByUsername', async (authData, thunkApi) => {
    try {
        const { extra } = thunkApi;

        const response = await extra.publicApi.post<AuthResponse>('/login', authData);

        if (!response.data || !response.data.user || !response.data.token) {
            throw new Error();
        }

        localStorage.setItem(TokenLocalStorageKey, JSON.stringify(response.data.token));
        thunkApi.dispatch(userActions.setAuthData(response.data.user));
        return response.data;
    } catch (e) {
        console.log(e);
        return thunkApi.rejectWithValue(400);
    }
});
