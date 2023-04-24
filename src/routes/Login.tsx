import { Form, ActionFunctionArgs, redirect } from 'react-router-dom'
import { UserData } from './Dashboard.tsx';
import axios from 'axios';
import { AxiosResponse } from 'axios';

export type EmailParams = {
    email: string,
    password: string
};

export type AuthResponse = {
    status: string,
    response: string,
    user: UserData
}

export async function loginAction({ request }: ActionFunctionArgs) {
    const userInput = Object.fromEntries(
        (await request.formData()).entries()
    ) as EmailParams;

    try {
        const { data } = await axios.post<AuthResponse, AxiosResponse<AuthResponse>, EmailParams>(
            `${import.meta.env.VITE_BASE_URL}/api/v1/user/authenticate`,
            userInput
        );

        if (data.status != 'error') {
            localStorage.setItem("jwt", data.response);
            return redirect('/dashboard');
        }

        // TODO: do some error handling
        return null;
    } catch (e) {
        throw new Error((e as Error).message);
    }
}

export default function SignUp() {
    return (
        <>
            <Form method="post" id="test-form">
                <p>
                    <span>Email</span>
                    <input
                        placeholder="email"
                        aria-label="email"
                        type="email"
                        name="email"
                        defaultValue="test2@email.com"
                    />
                </p>
                <p>
                    <span>password</span>
                    <input
                        placeholder="password"
                        aria-label="password"
                        type="password"
                        name="password"
                        defaultValue="1234"
                    />
                </p>
                <p>
                    <button type="submit">Login</button>
                </p>
            </Form>
        </>
    );
}
