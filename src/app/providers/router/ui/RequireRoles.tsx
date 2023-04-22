import { PropsWithChildren, ReactNode, memo } from 'react';
import { UserRole, getUserRoles } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';

interface RequireRolesProps {
    roles?: UserRole[];
    children?: ReactNode;
}

export const RequireRoles = memo((props: PropsWithChildren<RequireRolesProps>) => {
    const { roles = [], children } = props;
    const location = useLocation();

    const userRoles = useSelector(getUserRoles);

    if (!roles?.length) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <>{children}</>;
    }

    const hasRequiredRoles = roles.some((requiredRole) => userRoles?.includes(requiredRole));

    return hasRequiredRoles ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    ) : (
        <Navigate to={RoutePaths.forbidden} state={{ from: location }} replace />
    );
});
