/* eslint-disable arrow-body-style */
import { Suspense, FC, memo, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/widgets/PageLoader';
import { RouteConfig } from '../config/RouteConfig';
import { RequireAuth } from './RequireAuth';
import { RequireRoles } from './RequireRoles';

const AppRouter: FC = () => {
    const routes = useMemo(() => {
        return Object.values(RouteConfig).map(({ path, element, authOnly, roles }) => (
            <Route
                key={path}
                path={path}
                element={
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <Suspense fallback={<PageLoader />}>
                        {authOnly ? (
                            <RequireAuth>
                                <RequireRoles roles={roles}>{element}</RequireRoles>
                            </RequireAuth>
                        ) : (
                            element
                        )}
                    </Suspense>
                }
            />
        ));
    }, []);

    return <Routes>{routes}</Routes>;
};

export default memo(AppRouter);
