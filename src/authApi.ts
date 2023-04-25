import axios, { AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const JWT = 'jwt';

export type UserData = {
    admin: boolean,
    email: string,
    firstName: string,
    fullName: string,
    id: string,
    lastName: string,
    mobileNumber: string,
    profilePicture: string,
};

export type SignupParams = {
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    password: string
};

export type SignupResponse = {
    status: string,
    payload?: UserData
    errors?: {
        message: string
    }
}

export type LoginParams = {
    email: string,
    password: string
};

export type LoginResponse = {
    status: string,
    response: string,
    user: UserData
}


export async function signup(userInfo: SignupParams) {
    const { data } = await axios.post<
        SignupResponse,
        AxiosResponse<SignupResponse>,
        SignupParams
    >(`${BASE_URL}/api/v1/user/signup`, userInfo);

    return data;
}

export async function login(userInfo: LoginParams) {
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
