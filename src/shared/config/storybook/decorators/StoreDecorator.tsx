import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { Story } from '@storybook/react';
import 'app/styles/index.scss';
import { DeepPartial } from 'redux';

export const StoreDecorator = (state: DeepPartial<StateSchema>) => (Story: Story) =>
// eslint-disable-next-line implicit-arrow-linebreak
    (
        <StoreProvider initialState={state}>
            <Story />
        </StoreProvider>
    );
