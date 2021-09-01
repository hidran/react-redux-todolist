import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LIST_URL } from '../config';
// Define a service using a base URL and expected endpointsexport
export const listsApi = createApi({
    reducerPath: 'lists',
    baseQuery: fetchBaseQuery({
        baseUrl: LIST_URL,
    }),
    endpoints: (builder) => ({
        getLists: builder.query({
            query: () => '',
        }),
        deleteList: builder.mutation({
            query: (id) => ({
                url: '/' + id,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetListsQuery, useDeleteListMutation } = listsApi;
