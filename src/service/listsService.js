import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIURL } from '../config';
// Define a service using a base URL and expected endpointsexport
export const listsApi = createApi({
    reducerPath: 'lists',
    baseQuery: fetchBaseQuery({
        baseUrl: APIURL,
    }),
    endpoints: (builder) => ({
        getLists: builder.query({
            query: () => '/lists',
        }),
    }),
});

export const { useGetListsQuery } = listsApi;
