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
	SETTINGS = 'settings',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteNotFound = () => '*';
export const getRouteProfile = (id?: string | number) => `/profile/${id}`;
export const getRouteArticleDetail = (id?: string | number) => `/articles/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id?: string | number) => `/articles/${id}/edit`;
export const getRouteAdminPanel = () => '/admin';
export const getRouteForbidden = () => '/403';
export const getRouteSettings = () => '/settings';
