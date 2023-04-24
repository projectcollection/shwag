import { Form, ActionFunctionArgs, redirect } from 'react-router-dom'
import axios from 'axios';

export async function signUpAction({ request, params }: ActionFunctionArgs) {
    const { first, last, email, number, password } = Object.fromEntries(
        (await request.formData()).entries()
    );

    const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/signup`, {
        firstName: first,
        lastName: last,
        email,
        mobileNumber: number,
        password
    });

    if (data.status != 'error') {
        return redirect('/login');
    }

    //TODO: do some error handling
    return null;
}

export default function SignUp() {
    return (
        <>
            <Form method="post" id="test-form">
                <p>
                    <span>Name</span>
                    <input
                        placeholder="First"
                        aria-label="First name"
                        type="text"
                        name="first"
                        defaultValue="aroisn"
                    />
                    <input
                        placeholder="Last"
                        aria-label="Last name"
                        type="text"
                        name="last"
                        defaultValue="aroisn"
                    />
                </p>
                <p>
                    <span>Email</span>
                    <input
                        placeholder="email"
                        aria-label="email"
                        type="email"
                        name="email"
                        defaultValue="test@email.com"
                    />
                </p>
                <p>
                    <span>number</span>
                    <input
                        placeholder="number"
                        aria-label="number"
                        type="text"
                        name="number"
                        defaultValue="1234"
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
                    <button type="submit">Signup</button>
                </p>
            </Form>
        </>
    );
}
