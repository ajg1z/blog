import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserData } from '@/entities/User';
import { getRouteMain } from '@/shared/const/router';

interface RequireAuthProps {
    children?: ReactNode;
}

export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
    const user = useSelector(getUserData);
    const location = useLocation();

    if (!user) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};
