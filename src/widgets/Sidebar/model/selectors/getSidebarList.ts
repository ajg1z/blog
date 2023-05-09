import { StateSchema } from '@/app/providers/StoreProvider';
import MainIcon from '@/shared/assets/img/main.svg';
import AboutIcon from '@/shared/assets/img/about.svg';
import ProfileIcon from '@/shared/assets/img/profile.svg';
import ArticlesIcon from '@/shared/assets/img/articles.svg';
import { RoutePaths } from '@/shared/const/router';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarLinkList = (state: StateSchema) => {
    const isAuth = !!state.user.authData;

    const links: SidebarItemType[] = [
        {
            path: RoutePaths.main,
            text: 'main',
            Icon: MainIcon,
        },
        {
            path: RoutePaths.about,
            text: 'about',
            Icon: AboutIcon,
        },
    ];

    if (isAuth) {
        links.push(
            {
                path: RoutePaths.profile + state.user.authData!.id,
                text: 'profile',
                Icon: ProfileIcon,
                authOnly: true,
            },
            {
                path: RoutePaths.articles,
                text: 'articles',
                Icon: ArticlesIcon,
                authOnly: true,
            },
        );
    }

    return links;
};
