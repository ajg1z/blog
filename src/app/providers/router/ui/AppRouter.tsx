/* eslint-disable arrow-body-style */
import { getUserData } from 'entities/User';
import { Suspense, FC, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'widgets/PageLoader';
import { RouteConfig } from '../lib/RouteConfig';

const AppRouter: FC = () => {
    const isAuth = useSelector(getUserData);

    const routes = useMemo(() => {
        return Object.values(RouteConfig)
            .filter((route) => {
                if (route.authOnly && !isAuth) return false;
                return true;
            })
            .map((val) => (
                <Route
                    key={val.path}
                    path={val.path}
                    element={<div className='page-wrapper'>{val.element}</div>}
                />
            ));
    }, [isAuth]);

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>{routes}</Routes>
        </Suspense>
    );
};

export default memo(AppRouter);
