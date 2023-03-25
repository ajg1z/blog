import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollRecoverySchema } from '../types/scrollRecoverySchema';

const initialState: ScrollRecoverySchema = {};

export const scrollRecoverySlice = createSlice({
    initialState,
    name: 'scrollRecovery',
    reducers: {
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) => {
            state[payload.path] = payload.position;
        },
    },
});

export const { actions: scrollRecoveryActions } = scrollRecoverySlice;
export const { reducer: scrollRecoveryReducer } = scrollRecoverySlice;
