export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND = 'notFound',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_CREATE = 'articleCreate',
    ARTICLE_EDIT = 'articleEdit',
    ARTICLE_DETAIL = 'articleDetail',
    ADMIN_PANEL = 'adminPanel',
    FORBIDDEN = 'forbidden',
}

export const RoutePaths: Record<AppRoutes, string> = {
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.MAIN]: '/',
    [AppRoutes.NOT_FOUND]: '*',
    [AppRoutes.PROFILE]: '/profile/',
    [AppRoutes.ARTICLE_DETAIL]: '/articles/',
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTICLE_CREATE]: '/articles/new',
    [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
    [AppRoutes.ADMIN_PANEL]: '/admin',
    [AppRoutes.FORBIDDEN]: '/403',
};
