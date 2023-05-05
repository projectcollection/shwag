import { Form, ActionFunctionArgs, redirect, useNavigation, useSubmit } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { authApi, SignupParams, SignupParamsSchema } from '../redux/services/auth.ts';
import { store } from '../redux/store.ts';
import Spinner from '../components/Spinner.tsx';

export async function signUpAction({ request }: ActionFunctionArgs) {
    const userInput = Object.fromEntries(
        (await request.formData()).entries()
    ) as SignupParams;

    try {
        const res = await store.dispatch(authApi.endpoints.signUpUser.initiate(userInput));

        if ('data' in res && res.data.status === 'success') {
            //todo: toast maybe
            alert('success');
            return redirect('/login');
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
    const { register, handleSubmit, formState: { errors } } = useForm<SignupParams>({
        resolver: zodResolver(SignupParamsSchema)
    });
    const navigation = useNavigation();
    const submit = useSubmit();

    const onSubmit: SubmitHandler<SignupParams> = (data) => {
        submit(data, {
            method: 'post',
            action: '/signup'
        })
    }

    return (
        <>
            {navigation.state === 'submitting' ?
                (
                    <Spinner />
                )
                :
                (
                    <Form onSubmit={handleSubmit(onSubmit)} method="post" id="test-form">
                        <p>
                            <span>name</span>
                            <input
                                placeholder="First"
                                aria-label="First name"
                                type="text"
                                defaultValue="aroisn"
                                {...register('name')}
                            />
                            {errors.name?.message}
                        </p>
                        <p>
                            <span>email</span>
                            <input
                                placeholder="email"
                                aria-label="email"
                                type="email"
                                defaultValue="test@email.com"
                                {...register('email')}
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
                                {...register('password')}
                            />
                            {errors.password?.message}
                        </p>
                        <p>
                            <span>confirm password</span>
                            <input
                                placeholder="password"
                                aria-label="password"
                                type="password"
                                defaultValue="11111111"
                                {...register('passwordConfirm')}
                            />
                            {errors.passwordConfirm?.message}
                        </p>
                        <p>
                            <button type="submit">signup</button>
                        </p>
                    </Form>
                )
            }
        </>
    );
}
