import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import React from 'react';
import MainIcon from 'shared/assets/img/main.svg';
import AboutIcon from 'shared/assets/img/about.svg';
import ProfileIcon from 'shared/assets/img/profile.svg';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        text: 'main',
        Icon: MainIcon,
    },
    {
        path: RoutePath.about,
        text: 'about',
        Icon: AboutIcon,
    },
    {
        path: RoutePath.profile,
        text: 'profile',
        Icon: ProfileIcon,
    },
];
