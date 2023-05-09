import { PropsWithChildren, useLayoutEffect } from 'react';
import { Reducer } from '@reduxjs/toolkit';
import { StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';
import { useStore } from '@/shared/lib/hooks/useStore/useStore';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    isRemoveAfterUnmount?: boolean;
}

export const DynamicModuleLoader = (props: PropsWithChildren<DynamicModuleLoaderProps>) => {
    const { children, isRemoveAfterUnmount, reducers } = props;

    const store = useStore();
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        const mountedReducersKeys = Object.keys(store.manager.getReducerMap());

        Object.entries(reducers).forEach(([name, reducer]) => {
            if (!mountedReducersKeys.includes(name)) {
                store.manager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `${name} reducer added to store` });
            }
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
