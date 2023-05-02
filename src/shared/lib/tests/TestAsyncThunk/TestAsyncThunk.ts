import { AsyncThunkAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import axios, { AxiosStatic } from 'axios';
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

type ActionCreatorType<Return, Arg, RejectValue> = (
    arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectValue }>;

export class TestAsyncThunk<Return, Arg, RejectValue> {
    dispatch: Dispatch;

    getState: () => StateSchema;

    actionCreator: ActionCreatorType<Return, Arg, RejectValue>;

    privateApi: jest.MockedFunctionDeep<AxiosStatic>;

    publicApi: jest.MockedFunctionDeep<AxiosStatic>;

    navigate: jest.MockedFn<any>;

    constructor(
        actionCreator: ActionCreatorType<Return, Arg, RejectValue>,
        state?: DeepPartial<StateSchema>,
    ) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn(() => state as StateSchema);

        this.navigate = jest.fn();
        this.publicApi = mockedAxios;
        this.privateApi = mockedAxios;
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg);

        const extraArg = {
            navigate: this.navigate,
            privateApi: this.privateApi,
            publicApi: this.publicApi,
        };

        const result = await action(this.dispatch, this.getState, extraArg);
        return result;
    }
}
