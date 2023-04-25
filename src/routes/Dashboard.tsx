import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom'

import { getUserData, logout, UserData } from '../authApi.ts';

export interface DashboardLoader {
    (args: LoaderFunctionArgs): Promise<UserData | null>
}

export const dashboardLoader: DashboardLoader = async () => {
    try {
        const data = await getUserData();

        return data;
    } catch (e) {
        throw new Error((e as Error).message);
    }

};

export default function SignUp() {
    const data = useLoaderData() as Awaited<ReturnType<DashboardLoader>>;

    const { fullName, profilePicture } = data || {};

    return fullName ? (
        <>
            <img src={profilePicture} id="profpic"/>
            <h1>{`Hello ${fullName}`}!</h1>
            <button onClick={logout}>logout</button>
        </>
    ) : (
        <>
            <h1>Dashboard</h1>
        </>
    );
}
