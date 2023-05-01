import { z } from 'zod';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_BASE_URL;

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

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/auth/` }),
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
                body: data
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
//
// note: seems this is the only way to get data directly when using rtk-query
// store.getState() shows methods and such, not the data itself
export const { useSignUpUserMutation, useLoginUserMutation, useVerifyMutation } = authApi;
