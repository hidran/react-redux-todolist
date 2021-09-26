import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LIST_URL } from '../config';
// Define a service using a base URL and expected endpointsexport
export const listsApi = createApi({
    reducerPath: 'lists',
    tagTypes: ['LIST'],
    baseQuery: fetchBaseQuery({
        baseUrl: LIST_URL,
    }),
    endpoints: (builder) => ({
        getLists: builder.query({
            query: () => ({
                headers: {
                    Accept: 'application/json',
                },
            }),
            providesTags: (result, error) => {
                if (error || !result || !result.data) {
                    return [{ type: 'LIST' }];
                }
                return result.data.map((ele) => ({ type: 'LIST', id: ele.id }));
            },
        }),
        deleteList: builder.mutation({
            query: (id) => ({
                url: '/' + id,
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                },
            }),

            invalidatesTags: ['LIST'], // (result,error, id) => {type:'LIST', id:id}
        }),
        addList: builder.mutation({
            query: (list) => ({
                url: '',
                method: 'POST',
                body: list,
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: ['LIST'],
        }),
        updateList: builder.mutation({
            query: ({ id, ...body }) => ({
                url: '/' + id,
                method: 'PATCH',
                body,
                headers: {
                    Accept: 'application/json',
                },
            }),

            invalidatesTags: ['LIST'], // (result,error, id) => {type:'LIST', id:id}
        }),
    }),
});

export const {
    useUpdateListMutation,
    useAddListMutation,
    useGetListsQuery,
    useDeleteListMutation,
} = listsApi;
