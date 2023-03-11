import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { PropsWithChildren, useEffect, useLayoutEffect } from 'react';
import { Reducer } from '@reduxjs/toolkit';
import { useStore } from 'shared/hooks/useStore/useStore';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};

type ReducerListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    isRemoveAfterUnmount?: boolean;
}

export const DynamicModuleLoader = (props: PropsWithChildren<DynamicModuleLoaderProps>) => {
    const { children, isRemoveAfterUnmount, reducers } = props;

    const store = useStore();
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.manager.add(name as StateSchemaKey, reducer);
            dispatch({ type: `${name} reducer added to store` });
        });

        return () => {
            if (isRemoveAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.manager.remove(name as StateSchemaKey);
                    dispatch({ type: `${name} reducer removed from store` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    // eslint-disable-next-line
    return <>{children}</>;
};
