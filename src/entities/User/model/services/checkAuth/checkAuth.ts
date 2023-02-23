import { TokenLocalStorageKey } from 'shared/const/localStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types/userSchema';

export const checkAuth = createAsyncThunk<User, string>(
    'user/checkAuth',
    async (token, thunkApi) => {
        try {
            const response = await axios.get('http://localhost:8000/check-login', {
                headers: { authorization: `Bearer ${token.replaceAll('"', '')}` },
            });

            if (!response.data || !response.data.user || !response.data.token) throw new Error();
            localStorage.setItem(TokenLocalStorageKey, response.data.token);
            return response.data.user;
        } catch (e) {
            console.log(e);
            return thunkApi.rejectWithValue(e);
        }
    },
);
