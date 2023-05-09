import type {
    StateSchema,
    ThunkConfig,
    ReduxStoreWithManager,
    StateSchemaKey,
} from './config/StateSchema';
import { createReduxStore, AppDispatch } from './config/store';

export { StoreProvider } from './ui/StoreProvider';
export { createReduxStore };
export type { AppDispatch, ThunkConfig, StateSchema, ReduxStoreWithManager, StateSchemaKey };
