import { CounterSchema } from '../types/counterSchema';
import { buildSlice } from '@/shared/lib/store';

const initialState: CounterSchema = {
    value: 0,
};

export const CounterSlice = buildSlice({
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
export const { useActions: useCounterActions } = CounterSlice;
