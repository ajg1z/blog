export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND = 'notFound',
    PROFILE = 'profile',
}

export const RoutePath: Record<AppRoutes, string> = {
    about: '/about',
    main: '/',
    notFound: '*',
    profile: '/profile',
};
