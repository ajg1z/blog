import { ProfileSchema } from '@/entities/Profile';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { profileActions, profileReducer } from './profileSlice';

describe('ProfileSchema', () => {
    test('setReadOnly', () => {
        const state: ProfileSchema = {
            isLoading: false,
            readonly: false,
        };

        expect(profileReducer(state, profileActions.setReadonly(true))).toEqual({
            ...state,
            readonly: true,
        });
    });

    test('updateProfile', () => {
        const state: ProfileSchema = {
            isLoading: false,
            readonly: false,
            form: {
                age: 120,
                city: 'Belgrad',
                firstname: 'Mone',
            },
        };

        expect(
            profileReducer(state, profileActions.updateProfile({ firstname: 'Noon', age: 20 })),
        ).toEqual({
            ...state,
            form: {
                firstname: 'Noon',
                age: 20,
                city: 'Belgrad',
            },
        });
    });

    test('cancelEdit', () => {
        const state: ProfileSchema = {
            isLoading: false,
            readonly: false,
            form: {
                age: 120,
                city: 'Belgrad',
                firstname: 'Mone',
            },
            data: {
                age: 1,
                city: 'Ufa',
                firstname: 'Quick',
            },
        };

        expect(profileReducer(state, profileActions.cancelEdit())).toEqual({
            ...state,
            readonly: true,
            validateError: undefined,
            form: state.data,
        });
    });

    test('update profile pending', () => {
        const state: ProfileSchema = {
            isLoading: false,
            readonly: false,
        };

        expect(profileReducer(state, updateProfileData.pending)).toEqual({
            ...state,
            isLoading: true,
            error: undefined,
        });
    });
});
