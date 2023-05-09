import { StateSchema } from '@/app/providers/StoreProvider';
import MainIcon from '@/shared/assets/img/main.svg';
import AboutIcon from '@/shared/assets/img/about.svg';
import ProfileIcon from '@/shared/assets/img/profile.svg';
import ArticlesIcon from '@/shared/assets/img/articles.svg';
import {
    getRouteAbout,
    getRouteMain,
    getRouteProfile,
    getRouteArticles,
} from '@/shared/const/router';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarLinkList = (state: StateSchema) => {
    const isAuth = !!state.user.authData;

    const links: SidebarItemType[] = [
        {
            path: getRouteMain(),
            text: 'main',
            Icon: MainIcon,
        },
        {
            path: getRouteAbout(),
            text: 'about',
            Icon: AboutIcon,
        },
    ];

    if (isAuth) {
        links.push(
            {
                path: getRouteProfile(state.user.authData!.id),
                text: 'profile',
                Icon: ProfileIcon,
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                text: 'articles',
                Icon: ArticlesIcon,
                authOnly: true,
            },
        );
    }

    return links;
};
