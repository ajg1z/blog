export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND = 'notFound',
    PROFILE = 'profile',
}

export const RoutePaths: Record<AppRoutes, string> = {
    about: '/about',
    main: '/',
    notFound: '*',
    profile: '/profile',
};
