import { StateSchema } from '@/app/providers/StoreProvider';

import MainIconDeprecated from '@/shared/assets/img/main-v1.svg';
import AboutIconDeprecated from '@/shared/assets/img/about-v1.svg';
import ProfileIconDeprecated from '@/shared/assets/img/profile-v1.svg';
import ArticlesIconDeprecated from '@/shared/assets/img/articles-v1.svg';

import MainIcon from '@/shared/assets/img/main-v2.svg';
import ArticleIcon from '@/shared/assets/img/articles-v2.svg';
import AboutIcon from '@/shared/assets/img/about-v2.svg';
import ProfileIcon from '@/shared/assets/img/profile-v2.svg';

import { getRouteAbout, getRouteMain, getRouteProfile, getRouteArticles } from '@/shared/const/router';
import { SidebarItemType } from '../types/sidebar';
import { toggleFeature } from '@/shared/lib/featureFlags';

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
				Icon: ArticleIcon,
				authOnly: true,
			},
		);
	}

	return links;
};
