import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFountPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
};

export const RouteConfig: Record<AppRoutes, AppRouteProps> = {
    about: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    main: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    notFound: {
        path: RoutePath.notFound,
        element: <NotFoundPage />,
    },
    profile: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true,
    },
};
