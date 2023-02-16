import { Suspense, FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'widgets/PageLoader';
import { RouteConfig } from '../lib/RouteConfig';

const AppRouter: FC = () => (
    <Suspense fallback={<PageLoader />}>
        <Routes>
            {Object.values(RouteConfig).map((val) => (
                <Route
                    key={val.path}
                    path={val.path}
                    element={<div className='page-wrapper'>{val.element}</div>}
                />
            ))}
        </Routes>
    </Suspense>
);

export default AppRouter;
