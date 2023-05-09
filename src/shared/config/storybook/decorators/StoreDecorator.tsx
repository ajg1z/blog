/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import { ReducersMapObject } from 'redux';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import '@/app/styles/index.scss';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { profileReducer } from '@/features/EditableProfileCard/testing';
import { articleDetailsReducer } from '@/entities/Article/testing';
import { scrollRecoveryReducer } from '@/features/ScrollRecovery/testing';
import { articlesPageReducer } from '@/pages/ArticlesPage/testing';
import { addCommentFormReducer } from '@/features/AddCommentForm/testing';
import { userReducer } from '@/entities/User/testing';
import { counterReducer } from '@/entities/Counter/testing';
import { articleDetailsCommentsReducer } from '@/pages/ArticleDetailsPage/testing';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    login: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    articleDetailsComments: articleDetailsCommentsReducer,
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
