import { Form, useSubmit, redirect, ActionFunctionArgs } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { authApi, LoginParams, LoginParamsSchema } from '../redux/services/auth.ts';
import { store } from '../redux/store.ts';

export type ForgotPasswordParams = Pick<LoginParams, 'email'>;

export async function forgotPasswordAction({ request }: ActionFunctionArgs) {
    const userInput = Object.fromEntries(
        (await request.formData()).entries()
    ) as ForgotPasswordParams;

    try {
        const res = await store.dispatch(authApi.endpoints.forgotPassword.initiate(userInput.email));

        if ('data' in res && res.data.status === 'success') {
            return redirect('/resetPassword/replace_with_reset_token');
        } else {
            alert('fail');
        }

        return null;
    } catch (e) {
        throw new Error((e as Error).message);
    }
}

export default function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ForgotPasswordParams>({
        resolver: zodResolver(LoginParamsSchema.pick({ email: true }))
    });
    const submit = useSubmit();

    const onSubmit: SubmitHandler<ForgotPasswordParams> = (data) => {
        submit(data, {
            method: 'post',
            action: `/forgotPassword`
        })
    }

    return (
        <div>
            <div>
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
                        <button type="submit">get reset token</button>
                    </p>
                </Form>
            </div>
        </div>
    )
}
