export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND = 'notFound',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAIL = 'articleDetail',
}

export const RoutePaths: Record<AppRoutes, string> = {
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.MAIN]: '/',
    [AppRoutes.NOT_FOUND]: '*',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.ARTICLE_DETAIL]: '/articles/',
    [AppRoutes.ARTICLES]: '/articles',
};
