import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from '../../../../../entities/Profile/model/types/profileSchema';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<Profile, undefined, ThunkConfig<string>>(
    'login/updateProfileData',
    async (_, thunkApi) => {
        try {
            const { extra, getState } = thunkApi;

            const formData = getProfileForm(getState());

            const response = await extra.privateApi.post<Profile>('/profile', formData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkApi.rejectWithValue('400');
        }
    },
);
