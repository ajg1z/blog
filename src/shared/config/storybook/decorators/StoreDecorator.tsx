/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import { ReducersMapObject } from 'redux';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import '@/app/styles/index.scss';
import { loginReducer } from '@/features/AuthByUsername';
import { profileReducer } from '@/features/EditableProfileCard';
import { articleDetailsReducer } from '@/entities/Article';
import { scrollRecoveryReducer } from '@/features/ScrollRecovery';
import { articlesPageReducer } from '@/pages/ArticlesPage';
import { addCommentFormReducer } from '@/features/AddCommentForm';
import { userReducer } from '@/entities/User';
import { counterReducer } from '@/entities/Counter';
import { articleDetailsCommentsReducer } from '@/pages/ArticleDetailsPage';

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
