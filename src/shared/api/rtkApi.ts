import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TokenLocalStorageKey } from '@/shared/const/localStorage';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders(headers) {
            const token = localStorage.getItem(TokenLocalStorageKey);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
