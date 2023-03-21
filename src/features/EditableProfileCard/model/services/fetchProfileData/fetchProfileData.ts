import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from '../../../../../entities/Profile/model/types/profileSchema';

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (id, thunkApi) => {
        try {
            const { extra } = thunkApi;

            const response = await extra.privateApi.get<Profile>(`/profile/${id}`);

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
