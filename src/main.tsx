import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App.tsx'
import Signup, { signUpAction } from './routes/Signup.tsx'
import Login, { loginAction } from './routes/Login.tsx'
import Dashboard, { dashboardLoader } from './routes/Dashboard.tsx'
import ErrorPage from './routes/ErrorPage.tsx'
import Verification from './routes/Verification.tsx'
import './index.css'
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
