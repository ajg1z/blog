import { createSlice } from '@reduxjs/toolkit';

import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
    text: '',
};

export const addCommentFormSlice = createSlice({
    initialState,
    name: 'addCommentForm',
    reducers: {
        setText: (state, action) => {
            state.text = action.payload;
        },
    },
    // eslint-disable-next-line arrow-body-style
    extraReducers: (builder) => {
        // return builder
        //     .addCase(fetchaddCommentFormData.pending, (state) => {
        //         state.isLoading = true;
        //         state.error = undefined;
        //     })
        //     .addCase(fetchaddCommentFormData.fulfilled, (state, action) => {
        //         state.isLoading = false;
        //         state.data = action.payload;
        //         state.form = action.payload;
        //     })
        //     .addCase(fetchaddCommentFormData.rejected, (state, action) => {
        //         state.isLoading = false;
        //         state.error = action.payload;
        //     })
        //     .addCase(updateaddCommentFormData.pending, (state) => {
        //         state.isLoading = true;
        //         state.validateError = undefined;
        //     })
        //     .addCase(updateaddCommentFormData.fulfilled, (state, action) => {
        //         state.isLoading = false;
        //         state.data = action.payload;
        //         state.form = action.payload;
        //         state.readonly = true;
        //         state.validateError = undefined;
        //     })
        //     .addCase(updateaddCommentFormData.rejected, (state, action) => {
        //         state.isLoading = false;
        //         state.validateError = action.payload;
        //     });
    },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
