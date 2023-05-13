import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Profile } from '@/entities/Profile';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { privateApi } from '@/shared/api/api';
import { EditableProfileCard } from './EditableProfileCard';
import { profileReducer } from '../model/slice/profileSlice';

const profile: Profile = {
    age: 21,
    city: 'Ufa',
    country: Country.Russia,
    currency: Currency.RUB,
    firstname: 'Alsu',
    lastname: 'Usm',
    id: '1',
    username: 'Animechnik',
    avatar: 'avatar',
};

describe('features/EditableProfileCard.test', () => {
    test('Edit mode and save changes', async () => {
        const mockPutRequest = jest.spyOn(privateApi, 'put');

        componentRender(<EditableProfileCard id='1' isEditable />, {
            initialState: {
                profile: {
                    data: profile,
                    form: profile,
                    readonly: true,
                },
            },
            asyncReducers: { profile: profileReducer },
        });

        await userEvent.click(screen.getByTestId('EditableProfileCard.EditButton'));
        expect(screen.getByTestId('EditableProfileCard.CancelButton')).toBeInTheDocument();

        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'ASM');

        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue(`${profile.lastname}user`);
        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue(`${profile.firstname}ASM`);

        await userEvent.click(screen.getByTestId('EditableProfileCard.SaveButton'));

        expect(mockPutRequest).toHaveBeenCalled();

        expect(screen.getByTestId('EditableProfileCard.EditButton')).toBeInTheDocument();
    });

    test('Cancel changes', async () => {
        componentRender(<EditableProfileCard id='1' isEditable />, {
            initialState: {
                profile: {
                    data: profile,
                    form: profile,
                    readonly: true,
                },
                user: {
                    authData: { id: 1 },
                },
            },
            asyncReducers: { profile: profileReducer },
        });

        await userEvent.click(screen.getByTestId('EditableProfileCard.EditButton'));
        expect(screen.getByTestId('EditableProfileCard.CancelButton')).toBeInTheDocument();

        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'ASM');

        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('ASM');

        await userEvent.click(screen.getByTestId('EditableProfileCard.CancelButton'));

        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue(profile.lastname);
        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue(profile.firstname);
        expect(screen.getByTestId('EditableProfileCard.EditButton')).toBeInTheDocument();
    });
});
