import { z } from 'zod';
import axios, { AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const JWT = 'jwt';

export const UserDataSchema = z.object({
    admin: z.boolean(),
    email: z.string().email(),
    firstName: z.string().max(20),
    fullName: z.string().max(20),
    id: z.string(),
    lastName: z.string(),
    mobileNumber: z.string().max(10),
    profilePicture: z.string(),
    password: z.string()
});

export type UserData = z.infer<typeof UserDataSchema>;

export const SignupParamsSchema = UserDataSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    mobileNumber: true,
    password: true
});

export type SignupParams = z.infer<typeof SignupParamsSchema>;

export const SignupResponseSchema = z.object({
    status: z.string(),
    payload: UserDataSchema,
    errors: z.object({
        message: z.string()
    })
}).partial({
    payload: true,
    errors: true
});

export type SignupResponse = z.infer<typeof SignupResponseSchema>;

export const LoginParamsSchema = UserDataSchema.pick({
    email: true,
    password: true
});

export type LoginParams = z.infer<typeof LoginParamsSchema>;

const LoginResponseSchema = z.object({
    status: z.string(),
    response: z.string(),
    user: UserDataSchema
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export async function signup(userInfo: SignupParams) {
    SignupParamsSchema.parse(userInfo);

    const { data } = await axios.post<
        SignupResponse,
        AxiosResponse<SignupResponse>,
        SignupParams
    >(`${BASE_URL}/api/v1/user/signup`, userInfo);

    return data;
}

export async function login(userInfo: LoginParams) {
    LoginParamsSchema.parse(userInfo);

    const { data } = await axios.post<LoginResponse, AxiosResponse<LoginResponse>, LoginParams>(
        `${BASE_URL}/api/v1/user/authenticate`,
        userInfo
    );

    return data;
}

export function logout() {
    localStorage.removeItem(JWT);
    window.location.reload();
}

export async function getUserData() {
    const jwt = localStorage.getItem(JWT);

    if (!jwt) {
        return null;
    }

    const { data } = await axios.post<UserData, AxiosResponse<UserData>, {}>(
        `${BASE_URL}/api/v1/user/apiprofile`,
        {
        }, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });

    return data;
}
