import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIURL } from '../config';

export const AuthApi = createApi({
    reducerPath: 'AuthService',
    tagTypes: ['AUTH'],
    baseQuery: fetchBaseQuery({
        baseUrl: APIURL + '/auth',
    }),

    endpoints: (builder) => ({
        login: builder.mutation({
            query(body) {
                return {
                    url: '/login',
                    method: 'POST',
                    body,
                    headers: {
                        Accept: 'application/json',
                    },
                };
            },
        }),
        register: builder.mutation({
            query(body) {
                return {
                    url: '/register',
                    method: 'POST',
                    body,
                    headers: {
                        Accept: 'application/json',
                    },
                };
            },
        }),
    }),
});
export const { useLoginMutation, useRegisterMutation } = AuthApi;
