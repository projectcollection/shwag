import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App.tsx'
import './index.css'
import Signup, { signUpAction } from './routes/Signup.tsx'
import Login, { loginAction } from './routes/Login.tsx'
import Dashboard, { dashboardLoader, logoutAction } from './routes/Dashboard.tsx'
import ErrorPage from './routes/ErrorPage.tsx'
import Verification from './routes/Verification.tsx'
import ForgotPassword, { forgotPasswordAction } from './routes/ForgotPassword.tsx';
import ResetPassword, { resetPasswordAction } from './routes/ResetPassword.tsx'
import { store } from './redux/store.ts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'dashboard',
                loader: dashboardLoader,
                action: logoutAction,
                element: <Dashboard />
            },
            {
                path: 'signup',
                action: signUpAction,
                element: <Signup />
            },
            {
                path: 'login',
                action: loginAction,
                element: <Login />
            },
            {
                path: '/verifyemail/:verificationCode',
                element: <Verification/>
            },
            {
                path: '/forgotPassword',
                action: forgotPasswordAction,
                element: <ForgotPassword/>
            },
            {
                path: '/resetPassword/:resetToken',
                action: resetPasswordAction,
                element: <ResetPassword/>
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <RouterProvider router={router} />
        </ReduxProvider>
    </React.StrictMode>,
)
