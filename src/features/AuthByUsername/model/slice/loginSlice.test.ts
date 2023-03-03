import { LoginSchema } from '../types/loginSchema';
import { loginReducer, loginActions } from './loginSlice';

describe('loginSlice', () => {
    test('setPassword', () => {
        const state: LoginSchema = {
            password: '',
            username: '',
            isLoading: false,
        };

        expect(loginReducer(state, loginActions.setPassword('qwerty123'))).toEqual({
            ...state,
            password: 'qwerty123',
        });
    });

    test('setUsername', () => {
        const state: LoginSchema = {
            password: '',
            username: '',
            isLoading: false,
        };

        expect(loginReducer(state, loginActions.setUsername('1'))).toEqual({
            ...state,
            username: '1',
        });
    });
});
