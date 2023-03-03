import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'redux';
import { initialState } from '../../slice/loginSlice';
import { getLoginState } from './getLoginState';

describe('getLoginState', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: { username: 'volf', password: 'demion', isLoading: false },
        };
        expect(getLoginState(state as StateSchema)).toEqual(state.login);
    });

    test('should be initialState', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginState(state as StateSchema)).toEqual(initialState);
    });
});
