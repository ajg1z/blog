import { getUserData } from 'entities/User';
import { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';

interface RequireAuthProps {}

export const RequireAuth: FC = ({ children }: PropsWithChildren<RequireAuthProps>) => {
    const user = useSelector(getUserData);
    const location = useLocation();

    if (!user) {
        return <Navigate to={RoutePaths.main} state={{ from: location }} />;
    }
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};
