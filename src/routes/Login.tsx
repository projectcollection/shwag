import { Form, ActionFunctionArgs, redirect } from 'react-router-dom'
import axios from 'axios';

export async function loginAction({ request, params }: ActionFunctionArgs) {
    const { email, password } = Object.fromEntries(
        (await request.formData()).entries()
    );

    const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/authenticate`,
        {
            email,
            password
        });

    if (data.status != 'error') {
        localStorage.setItem("jwt", data.response);
        return redirect('/dashboard');
    }

    // TODO: maybe, send error to current page and show error indicator
    return null;
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
