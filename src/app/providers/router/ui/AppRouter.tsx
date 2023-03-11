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
        return Object.values(RouteConfig).filter((route) => {
            if (route.authOnly && !isAuth) return false;
            return true;
        });
    }, [isAuth]);

    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        // eslint-disable-next-line react/jsx-wrap-multilines
                        <Suspense fallback={<PageLoader />}>
                            <div className='page-wrapper'>{element}</div>
                        </Suspense>
                    }
                />
            ))}
        </Routes>
    );
};

export default memo(AppRouter);
