import { Form, useLoaderData, redirect, LoaderFunctionArgs } from 'react-router-dom'

import { authApi, userApi, UserData, BASE_URL, JWT } from '../redux/services/auth.ts';
import { store } from '../redux/store.ts';

export interface DashboardLoader {
    (args: LoaderFunctionArgs): Promise<{ status: string, user?: UserData }>
}

export const dashboardLoader = async () => {
    try {
        const res = await store.dispatch(userApi.endpoints.me.initiate());
        if (res.status != 'rejected') {
            return res.data?.data;
        } else {
            const refreshRes = await store.dispatch(authApi.endpoints.refresh.initiate());

            if (res.status != 'rejected') {
                localStorage.setItem(JWT, refreshRes.data?.access_token || '');
                return redirect('/dashboard');
            }
            return redirect('/login');
        }
    } catch (e) {
        throw new Error((e as Error).message);
    }
};

export async function logoutAction() {
    localStorage.removeItem(JWT);
    await store.dispatch(authApi.endpoints.logoutUser.initiate());
    return redirect('/login');
}

export default function DashBoard() {
    const { user } = useLoaderData() as Awaited<ReturnType<DashboardLoader>>;
    const { name, photo } = user || {};

    return name ? (
        <>
            <img src={`${BASE_URL}/api/static/users/${photo}`} id="profpic" />
            <h1>{`Hello ${name}`}!</h1>

            <Form method='post' action='/dashboard'>
                <button type='submit'>logout</button>
            </Form>
        </>
    ) : (
        <>
            <h1>Dashboard</h1>
        </>
    );
}
