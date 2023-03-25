import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
    children: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<StateSchema>;
}

export const StoreProvider: FC<StoreProviderProps> = (props) => {
    const { children, initialState, asyncReducers } = props;

    // const navigate = useNavigate();

    const store = createReduxStore(
        initialState as StateSchema,
        // @ts-ignore
        asyncReducers,
        // navigate,
    );

    return <Provider store={store}>{children}</Provider>;
};
