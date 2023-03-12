import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkAuth } from '../services/checkAuth/checkAuth';
import { User, UserSchema } from '../types/userSchema';

const initialState: UserSchema = {
    isLoading: true,
};

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        logout: (state) => {
            state.authData = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.authData = action.payload;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
