import React from 'react'
import PageHeader from '../../components/pageHeader'
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routes';

export default function LoginPage() {

    let user = {};
    if (user) {
        return <Navigate to={ROUTES.ROOT} replace />;
    }
    return (
        <>
            <PageHeader
                title="Login LYposts"
                subtitle="login and see what's new"
            />
        </>
    )
}
