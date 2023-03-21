import { ArticleDetailsSchema } from 'entities/Article';
import { LoginSchema } from 'features/AuthByUsername';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import { AddCommentFormSchema } from 'features/AddCommentForm';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;

    login?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
    addCommentForm?: AddCommentFormSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    manager: ReducerManager;
}

export interface ThunkExtraArg {
    privateApi: AxiosInstance;
    publicApi: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
