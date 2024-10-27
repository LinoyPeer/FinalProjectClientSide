import React from 'react'
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routes';
import { useAuth } from '../../providers/AuthProvider';
import LoginForm from '../../forms/pages/LoginForm';

export default function LoginPage() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to={ROUTES.ROOT} replace />;
    }
    return (
        <>
            <LoginForm />
        </>
    )
}
