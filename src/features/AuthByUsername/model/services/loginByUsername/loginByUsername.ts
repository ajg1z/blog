import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { TokenLocalStorageKey } from 'shared/const/localStorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps>(
    'login/loginByUsername',
    async (authData, thunkApi) => {
        try {
            const response = await axios.post('http://localhost:8000/login', authData);

            if (!response.data || !response.data.user || !response.data.token) {
                throw new Error();
            }

            localStorage.setItem(TokenLocalStorageKey, JSON.stringify(response.data.token));
            thunkApi.dispatch(userActions.setAuthData(response.data.user));

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkApi.rejectWithValue(e.response.status);
        }
    },
);
