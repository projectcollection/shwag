import { Form, ActionFunctionArgs, redirect, useNavigation, useSubmit, Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { authApi, LoginParams, LoginParamsSchema, JWT, useMeQuery } from '../redux/services/auth.ts';
import { store } from '../redux/store.ts';
import Spinner from '../components/Spinner.tsx';

export async function loginAction({ request }: ActionFunctionArgs) {
    const userInput = Object.fromEntries(
        (await request.formData()).entries()
    ) as LoginParams;

    try {
        const res = await store.dispatch(authApi.endpoints.loginUser.initiate(userInput));

        if ('data' in res && res.data.status === 'success') {
            //todo: toast maybe
            localStorage.setItem(JWT, res.data.access_token);
            return redirect('/dashboard');
        } else {
            alert('fail');
        }

        // TODO: do some error handling
        return null;
    } catch (e) {
        throw new Error((e as Error).message);
    }
}

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginParams>({
        resolver: zodResolver(LoginParamsSchema)
    });
    const navigation = useNavigation();
    const submit = useSubmit();
    const { data } = useMeQuery();

    const onSubmit: SubmitHandler<LoginParams> = (data) => {
        submit(data, {
            method: 'post',
            action: '/login'
        })
    }

    return (
        <>
            {navigation.state === 'submitting' ?
                (
                    <Spinner />
                ) :
                (
                    data ?
                        <Link to='/dashboard'>go to dashboard</Link>
                        :
                        <>
                            <Form onSubmit={handleSubmit(onSubmit)} method="post" id="test-form">
                                <p>
                                    <span>email</span>
                                    <input
                                        placeholder="email"
                                        aria-label="email"
                                        defaultValue="test@email.com"
                                        {...register("email")}
                                    />
                                    {errors.email?.message}
                                </p>
                                <p>
                                    <span>password</span>
                                    <input
                                        placeholder="password"
                                        aria-label="password"
                                        type="password"
                                        defaultValue="11111111"
                                        {...register("password")}
                                    />
                                    {errors.password?.message}
                                </p>
                                <p>
                                    <button type="submit">Login</button>
                                </p>
                            </Form>

                            <Link to="/forgotPassword">forgot password</Link>
                        </>

                )
            }
        </>
    );
}
