import { Navigate, useLocation } from 'react-router-dom';
import type { PropsWithChildren } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../hooks';

function PrivateRoute(props: PropsWithChildren) {
    const { children } = props;
    const location = useLocation();
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

    if (location.pathname === AppRoute.Login && authorizationStatus === AuthorizationStatus.Auth) {
        return <Navigate to={AppRoute.Main} />;
    }

    if (location.pathname !== AppRoute.Login && authorizationStatus !== AuthorizationStatus.Auth) {
        return <Navigate to={AppRoute.Login} />;
    }

    return children;
}

export { PrivateRoute };