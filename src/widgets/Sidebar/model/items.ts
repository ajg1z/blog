import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import React from 'react';
import MainIcon from 'shared/assets/img/main.svg';
import AboutIcon from 'shared/assets/img/about.svg';
import ProfileIcon from 'shared/assets/img/profile.svg';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
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
    {
        path: RoutePaths.profile,
        text: 'profile',
        Icon: ProfileIcon,
        authOnly: true,
    },
];
