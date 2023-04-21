import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { scrollRecoveryReducer } from 'features/ScrollRecovery';
import { NavigateOptions, To } from 'react-router-dom';
import { privateApi, publicApi } from 'shared/api/api';
import { rtkApi } from 'shared/api/rtkApi';
import { createReducerManager } from './reduxManager';
import { StateSchema } from './StateSchema';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void,
) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        [rtkApi.reducerPath]: rtkApi.reducer,
        counter: counterReducer,
        user: userReducer,
        scrollRecovery: scrollRecoveryReducer,
    };

    const manager = createReducerManager(rootReducer);

    const store = configureStore({
        reducer: manager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: { extraArgument: { privateApi, navigate, publicApi } },
            }).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.manager = manager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
