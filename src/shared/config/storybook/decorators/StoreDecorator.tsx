/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import 'app/styles/index.scss';
import { ReducersMapObject } from 'redux';
import { loginReducer } from 'features/AuthByUsername';
import { Story } from '@storybook/react';
import { profileReducer } from 'features/EditableProfileCard';
import { articleDetailsReducer } from 'entities/Article';
import { scrollRecoveryReducer } from 'features/ScrollRecovery';
import { articlesPageReducer } from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import { addCommentFormReducer } from 'features/AddCommentForm/model/slice/addCommentFormSlice';
import { userReducer } from 'entities/User';
import { counterReducer } from 'entities/Counter';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    login: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    articleDetailsPage: articleDetailsReducer,
    scrollRecovery: scrollRecoveryReducer,
    articlesPage: articlesPageReducer,
    addCommentForm: addCommentFormReducer,
    user: userReducer,
    counter: counterReducer,
};

export const StoreDecorator =
    (
        state: DeepPartial<StateSchema>,
        asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
    ) =>
    (Story: Story) =>
        (
            <StoreProvider
                initialState={state}
                asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
            >
                <Story />
            </StoreProvider>
        );
