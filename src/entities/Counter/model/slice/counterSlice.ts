import { createSlice } from '@reduxjs/toolkit';
import { CounterSchema } from '../types/counterSchema';

const initialState: CounterSchema = {
    value: 0,
};

export const CounterSlice = createSlice({
    initialState,
    name: 'counter',
    reducers: {
        decrement: (state) => {
            state.value -= 1;
        },

        increment: (state) => {
            state.value += 1;
        },
    },
});

export const { actions: counterActions } = CounterSlice;
export const { reducer: counterReducer } = CounterSlice;
