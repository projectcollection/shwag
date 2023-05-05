import { useParams, Form, useSubmit, redirect, ActionFunctionArgs } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { authApi, LoginParams, LoginParamsSchema } from '../redux/services/auth.ts';
import { store } from '../redux/store.ts';

export type PasswordResetParams = Pick<LoginParams, 'password'> & { resetToken: string };

export async function resetPasswordAction({ request }: ActionFunctionArgs) {
    const userInput = Object.fromEntries(
        (await request.formData()).entries()
    ) as PasswordResetParams;

    try {
        const res = await store.dispatch(authApi.endpoints.resetPassword.initiate(userInput));

        if ('data' in res && res.data.status === 'success') {
            //todo: toast maybe
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

export default function ResetPassword() {
    const { resetToken = "" } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<
        Pick<PasswordResetParams, 'password'>
    >({
        resolver: zodResolver(LoginParamsSchema.pick({ password: true }))
    });
    const submit = useSubmit();


    const onSubmit: SubmitHandler<
        Pick<PasswordResetParams, 'password'>
    > = (data) => {
        submit({ ...data, resetToken }, {
            method: 'post',
            action: `/resetPassword/${resetToken}`
        })
    }

    return (
        <div>
            <div>
                <Form onSubmit={handleSubmit(onSubmit)} method="post" id="test-form">
                    <p>
                        <span>password</span>
                        <input
                            placeholder="password"
                            aria-label="password"
                            type="password"
                            defaultValue="111111111"
                            {...register("password")}
                        />
                        {errors.password?.message}
                    </p>
                    <p>
                        <button type="submit">reset password</button>
                    </p>
                </Form>
            </div>
        </div>
    )
}
