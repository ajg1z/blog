import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFountPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePaths } from 'shared/config/routeConfig/routeConfig';

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
};

export const RouteConfig: Record<AppRoutes, AppRouteProps> = {
    about: {
        path: RoutePaths.about,
        element: <AboutPage />,
    },
    main: {
        path: RoutePaths.main,
        element: <MainPage />,
    },
    notFound: {
        path: RoutePaths.notFound,
        element: <NotFoundPage />,
    },
    profile: {
        path: RoutePaths.profile,
        element: <ProfilePage />,
        authOnly: true,
    },
};
