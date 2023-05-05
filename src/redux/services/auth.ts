import { z } from 'zod';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const JWT = 'jwt';

export const SignupParamsSchema = z.object({
    email: z.string().email(),
    name: z.string().max(20),
    password: z.string()
        .min(8, "8 characters minimum")
        .max(32, "Must be less than 30 characters"),
    passwordConfirm: z.string().min(1, "confirm password"),
}).refine((data) => data.password === data.passwordConfirm, {
    path: ["confirmPassword"],
    message: "passwords don't match"
});

export type SignupParams = z.infer<typeof SignupParamsSchema>;

export const LoginParamsSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, "8 characters minimum")
        .max(32, "Must be less than 30 characters"),
});

export type LoginParams = z.infer<typeof LoginParamsSchema>;

export const UserDataSchema = z.object({
    "name": z.string(),
    "email": z.string(),
    "role": z.string(),
    "photo": z.string(),
    "verified": z.boolean(),
    "provider": z.string(),
    "createdAt": z.string(),
    "updatedAt": z.string(),
    "id": z.string(),
});

export type UserData = z.infer<typeof UserDataSchema>;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/auth/`,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        signUpUser: builder.mutation<{ status: string, message: string }, SignupParams>({
            query: (data) => ({
                url: 'register',
                method: 'POST',
                body: data
            }),
        }),
        loginUser: builder.mutation<{ status: string, access_token: string }, LoginParams>({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body: data,
            }),
        }),
        logoutUser: builder.query<{ status: string }, void>({
            query: () => `logout`,
        }),
        refresh: builder.query<{ status: string, access_token: string }, void>({
            query: () => ({
                url: 'refresh',
                method: 'GET',
            }),
        }),
        verify: builder.mutation<{ status: string, message: string }, string>({
            query: (verificationCode) => ({
                url: `verifyemail/${verificationCode}`,
                method: 'GET',
            }),
        }),
    }),
})

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/users/`, prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${localStorage.getItem(JWT)}`);

            return headers;
        },
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        me: builder.query<{ status: string, data: UserData }, void>({
            query: () => `me`,
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
//
// note: seems this is the only way to get data directly when using rtk-query
// store.getState() shows methods and such, not the data itself
export const {
    useSignUpUserMutation,
    useLoginUserMutation,
    useVerifyMutation,
    useRefreshQuery,
    useLogoutUserQuery
} = authApi;
export const { useMeQuery } = userApi;
