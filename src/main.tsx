import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx'
import Signup, { signUpAction } from './routes/Signup.tsx'
import Login, { loginAction } from './routes/Login.tsx'
import Dashboard, { dashboardLoader } from './routes/Dashboard.tsx'
import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: 'dashboard',
        loader: dashboardLoader,
        element: <Dashboard/>
    },
    {
        path: 'signup',
        action: signUpAction,
        element: <Signup/>
    },
    {
        path: 'login',
        action: loginAction,
        element: <Login />
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
