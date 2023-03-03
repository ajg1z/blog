import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../types/profileSchema';

const initialState: ProfileSchema = {
    isLoading: false,
    readonly: true,
    data: undefined,
    error: undefined,
};

export const profileSlice = createSlice({
    initialState,
    name: 'profile',
    reducers: {},
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
