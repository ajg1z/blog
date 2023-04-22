import { UserRole } from 'entities/User';
import { AboutPage } from 'pages/AboutPage';
import { AdminPanelPage } from 'pages/AdminPanelPage';
import { ArticleCreatePage } from 'pages/ArticleCreatePage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticleEditPage } from 'pages/ArticleEditPage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { ForbiddenPagePage } from 'pages/ForbiddenPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFountPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePaths } from 'shared/config/routeConfig/routeConfig';

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
};

export const RouteConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.ABOUT]: {
        path: RoutePaths.about,
        element: <AboutPage />,
    },
    [AppRoutes.MAIN]: {
        path: RoutePaths.main,
        element: <MainPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePaths.notFound,
        element: <NotFoundPage />,
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePaths.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: RoutePaths.articles,
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAIL]: {
        path: `${RoutePaths.articleDetail}:id`,
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: RoutePaths.articleCreate,
        element: <ArticleCreatePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: RoutePaths.articleEdit,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: RoutePaths.adminPanel,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.ADMIN, UserRole.MANAGER],
    },
    [AppRoutes.FORBIDDEN]: {
        path: RoutePaths.forbidden,
        element: <ForbiddenPagePage />,
    },
};
