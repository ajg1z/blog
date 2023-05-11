/* eslint-disable arrow-body-style */
import { Suspense, FC, memo, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/widgets/PageLoader';
import { RouteConfig } from '../config/RouteConfig';
import { ValidateRoute } from './ValidateRoute';

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
                            <ValidateRoute roles={roles}>{element}</ValidateRoute>
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
