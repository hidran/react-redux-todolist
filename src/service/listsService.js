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
            query: () => '',
            providesTags: (result, error) => {
                if (error || !result) {
                    return [{ type: 'LIST' }];
                }
                return result.map((ele) => ({ type: 'LIST', id: ele.id }));
            },
        }),
        deleteList: builder.mutation({
            query: (id) => ({
                url: '/' + id,
                method: 'DELETE',
            }),

            invalidatesTags: ['LIST'], // (result,error, id) => {type:'LIST', id:id}
        }),
        addList: builder.mutation({
            query: (list) => ({
                url: '',
                method: 'POST',
                body: list,
            }),
            invalidatesTags: ['LIST'],
        }),
        updateList: builder.mutation({
            query: ({ id, ...body }) => ({
                url: '/' + id,
                method: 'PATCH',
                body,
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
