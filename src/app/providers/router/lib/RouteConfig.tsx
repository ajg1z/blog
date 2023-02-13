import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';

export const RouteConfig: Record<AppRoutes, RouteProps> = {
    about: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    main: {
        path: RoutePath.main,
        element: <MainPage />,
    },
};
