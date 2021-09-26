import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TODO_URL } from '../config';
// Define a service using a base URL and expected endpointsexport
export const todosApi = createApi({
    reducerPath: 'todos',
    tagTypes: ['TODOS'],
    baseQuery: fetchBaseQuery({
        baseUrl: TODO_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            headers.set('Accept', 'application/json');
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (list_id = '') => '?list_id=' + list_id,
            providesTags: (result, error) => {
                if (error || !result || !result.data) {
                    return [{ type: 'TODOS' }];
                }
                return result.data.map((ele) => ({
                    type: 'TODOS',
                    id: ele.id,
                }));
            },
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: '/' + id,
                method: 'DELETE',
            }),

            invalidatesTags: ['TODOS'], // (result,error, id) => {type:'LIST', id:id}
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '',
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['TODOS'],
        }),
        updateTodo: builder.mutation({
            query: ({ id, ...body }) => ({
                url: '/' + id,
                method: 'PATCH',
                body,
            }),

            invalidatesTags: ['TODOS'], // (result,error, id) => {type:'LIST', id:id}
        }),
    }),
});

export const {
    useUpdateTodoMutation,
    useAddTodoMutation,
    useGetTodosQuery,
    useDeleteTodoMutation,
} = todosApi;
