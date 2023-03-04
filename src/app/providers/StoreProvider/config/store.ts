import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { NavigateFunction } from 'react-router-dom';
import { privateApi, publicApi } from 'shared/api/api';
import { createReducerManager } from './reduxManager';
import { StateSchema } from './StateSchema';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: NavigateFunction,
) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };

    const manager = createReducerManager(rootReducer);

    const store = configureStore({
        reducer: manager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            getDefaultMiddleware({
                thunk: { extraArgument: { privateApi, navigate, publicApi } },
            }),
    });

    // @ts-ignore
    store.manager = manager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
