import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollRecovery = (state: StateSchema) => state.scrollRecovery;

export const getScrollPositionByPath = createSelector(
    getScrollRecovery,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
