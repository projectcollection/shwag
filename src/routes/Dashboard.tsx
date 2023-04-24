import { Form, LoaderFunction, useLoaderData } from 'react-router-dom'
import axios from 'axios';

export const dashboardLoader: LoaderFunction = async () =>  {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
        return null;
    }

    const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/apiprofile`,
        {
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

    if (data.status != 'error') {
        return data;
    }

    // TODO: do some error handling
    return null;
};

export default function SignUp() {
    const { firstName, lastName } = useLoaderData() || {};

    console.log(firstName, lastName);

    return firstName && lastName ? (
        <>
            <h1>{`Hello ${firstName} ${lastName}`}!</h1>
        </>
    ) : (
        <>
            <h1>Dashboard</h1>
        </>
    );
}
