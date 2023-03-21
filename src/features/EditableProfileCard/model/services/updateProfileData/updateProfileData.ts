import { ValidateProfileError } from 'features/EditableProfileCard/model/types/profile';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { Profile } from '../../../../../entities/Profile/model/types/profileSchema';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (id, thunkApi) => {
    try {
        const { extra, getState } = thunkApi;

        const formData = getProfileForm(getState());

        const errors = validateProfileData(formData);

        if (errors.length) {
            return thunkApi.rejectWithValue(errors);
        }

        const response = await extra.privateApi.put<Profile>(`/profile/${id}`, formData);

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return thunkApi.rejectWithValue(['FailUpdate']);
    }
});
