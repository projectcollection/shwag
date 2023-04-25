import { Form, ActionFunctionArgs, redirect } from 'react-router-dom'

import { signup, SignupParams } from '../authApi.ts';

export async function signUpAction({ request }: ActionFunctionArgs) {
    const userInput = Object.fromEntries(
        (await request.formData()).entries()
    ) as SignupParams;

    try {
        const data = await signup(userInput);
        if (data.status != 'error') {
            return redirect('/login');
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
                    <span>first name</span>
                    <input
                        placeholder="First"
                        aria-label="First name"
                        type="text"
                        name="first"
                        defaultValue="aroisn"
                    />
                </p>
                <p>
                    <span>last name</span>
                    <input
                        placeholder="Last"
                        aria-label="Last name"
                        type="text"
                        name="last"
                        defaultValue="aroisn"
                    />
                </p>
                <p>
                    <span>email</span>
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
                    <button type="submit">signup</button>
                </p>
            </Form>
        </>
    );
}
