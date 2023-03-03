import { useStore as useReduxStore } from 'react-redux';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider/config/StateSchema';

export const useStore = () => useReduxStore() as ReduxStoreWithManager;
