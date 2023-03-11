import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/image/avatar.png';
import { fetchProfileData } from './fetchProfileData';

describe('fetchProfileData', () => {
    test('success', async () => {
        const data = {
            username: 'Demion',
            age: 20,
            city: 'Ufa',
            country: Country.Russia,
            currency: Currency.RUB,
            firstname: 'Ajgiz',
            lastname: 'Usmanov',
            avatar,
        };
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.privateApi.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);

        expect(thunk.privateApi.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('bad request', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.privateApi.get.mockReturnValue(Promise.resolve({ status: 400 }));
        const result = await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);

        expect(thunk.privateApi.get).toHaveBeenCalled();

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
