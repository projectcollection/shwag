import { Form, ActionFunctionArgs, redirect, useNavigation, useSubmit } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signup, SignupParams, SignupParamsSchema } from '../authApi.ts';
import Spinner from '../components/Spinner.tsx';

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
                            <span>first name</span>
                            <input
                                placeholder="First"
                                aria-label="First name"
                                type="text"
                                defaultValue="aroisn"
                                {...register('firstName')}
                            />
                            {errors.firstName?.message}
                        </p>
                        <p>
                            <span>last name</span>
                            <input
                                placeholder="Last"
                                aria-label="Last name"
                                type="text"
                                defaultValue="aroisn"
                                {...register('lastName')}
                            />
                            {errors.lastName?.message}
                        </p>
                        <p>
                            <span>email</span>
                            <input
                                placeholder="email"
                                aria-label="email"
                                type="email"
                                defaultValue="test@email.com"
                                {...register('lastName')}
                            />
                            {errors.email?.message}
                        </p>
                        <p>
                            <span>number</span>
                            <input
                                placeholder="number"
                                aria-label="number"
                                type="text"
                                defaultValue="1234"
                                {...register('mobileNumber')}
                            />
                            {errors.mobileNumber?.message}
                        </p>
                        <p>
                            <span>password</span>
                            <input
                                placeholder="password"
                                aria-label="password"
                                type="password"
                                defaultValue="1234"
                                {...register('password')}
                            />
                            {errors.password?.message}
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
