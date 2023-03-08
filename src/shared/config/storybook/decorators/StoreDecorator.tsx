/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import 'app/styles/index.scss';
import { ReducersMapObject } from 'redux';
import { loginReducer } from 'features/AuthByUsername';
import { Story } from '@storybook/react';
import { profileReducer } from 'features/EditableProfileCard';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    login: loginReducer,
    profile: profileReducer,
};

export const StoreDecorator =
    (
        state: DeepPartial<StateSchema>,
        asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
    ) =>
    // eslint-disable-next-line arrow-body-style, implicit-arrow-linebreak
    (Story: Story) => {
        return (
            <StoreProvider
                initialState={state}
                asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
            >
                <Story />
            </StoreProvider>
        );
    };
