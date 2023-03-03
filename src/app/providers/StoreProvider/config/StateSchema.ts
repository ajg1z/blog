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

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;

    login?: LoginSchema;
    profile?: ProfileSchema;
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
