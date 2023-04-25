import { Form, ActionFunctionArgs, redirect } from 'react-router-dom'

import { login, LoginParams } from '../authApi.ts';

export async function loginAction({ request }: ActionFunctionArgs) {
    const userInput = Object.fromEntries(
        (await request.formData()).entries()
    ) as LoginParams;

    try {
        const data = await login(userInput);

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
                    <span>email</span>
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
