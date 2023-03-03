import { useStore as useReduxStore } from 'react-redux';
import { ReduxStoreWithManager } from '../../config/StateSchema';

export const useStore = () => useReduxStore() as ReduxStoreWithManager;
