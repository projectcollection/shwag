import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios';

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

export interface DashboardLoader {
    (args: LoaderFunctionArgs): Promise<UserData | null>
}

export const dashboardLoader: DashboardLoader = async () => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
        return null;
    }

    try {

        const { data } = await axios.post<UserData, AxiosResponse<UserData>, {}>(
            `${import.meta.env.VITE_BASE_URL}/api/v1/user/apiprofile`,
            {
            }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        return data;
    } catch (e) {
        throw new Error((e as Error).message);
    }

};

export default function SignUp() {
    const data = useLoaderData() as Awaited<ReturnType<DashboardLoader>>;

    const { fullName } = data || {};

    return fullName ? (
        <>
            <h1>{`Hello ${fullName}`}!</h1>
        </>
    ) : (
        <>
            <h1>Dashboard</h1>
        </>
    );
}
