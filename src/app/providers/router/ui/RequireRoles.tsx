import { PropsWithChildren, ReactNode, memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRole, getUserRoles } from '@/entities/User';
import { RoutePaths } from '@/shared/const/router';

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
