import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/image/avatar.png';
import { updateProfileData } from './updateProfileData';

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

describe('updateProfileData', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, { profile: { form: data } });

        thunk.privateApi.put.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);

        expect(thunk.privateApi.put).toHaveBeenCalled();

        expect(result.meta.requestStatus).toBe('fulfilled');

        expect(result.payload).toEqual(data);
    });

    test('bad request', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, { profile: { form: data } });

        thunk.privateApi.put.mockReturnValue(Promise.resolve({ status: 400 }));

        const result = await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);

        expect(thunk.privateApi.put).toHaveBeenCalled();

        expect(result.meta.requestStatus).toBe('rejected');

        expect(result.payload).toEqual(['FailUpdate']);
    });

    test('validate form', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, { profile: { form: undefined } });

        thunk.privateApi.put.mockReturnValue(Promise.resolve({ status: 400 }));

        const result = await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);

        expect(thunk.privateApi.put).not.toHaveBeenCalled();

        expect(result.meta.requestStatus).toBe('rejected');

        expect(result.payload).toEqual(['NoData']);
    });
});
