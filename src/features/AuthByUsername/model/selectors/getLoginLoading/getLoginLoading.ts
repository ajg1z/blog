import { createSelector } from '@reduxjs/toolkit';
import { getLoginState } from '../getLoginState/getLoginState';

export const getLoginLoading = createSelector(getLoginState, (state) => state.isLoading);
