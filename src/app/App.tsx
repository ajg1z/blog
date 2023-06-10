import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { checkAuth, getUserLoading } from '@/entities/User';
import { PageLoader } from '@/widgets/PageLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import useTheme from '@/shared/lib/hooks/useTheme/useTheme';
import { DESIGN_STORAGE_THEME_KEY, LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { ToggleFeatureComponent, toggleFeature } from '@/shared/lib/featureFlags';
import { MainLayout } from '@/shared/lib/layouts/MainLayout';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';

function App() {
	const dispatch = useAppDispatch();
	const userLoading = useSelector(getUserLoading);
	const { theme, onChangeTheme } = useTheme();
	const { t } = useTranslation();

	useEffect(() => {
		(async () => {
			const { meta, payload } = await dispatch(checkAuth());
			if (meta.requestStatus === 'fulfilled' && payload && typeof payload === 'object') {
				const jsonSettingsTheme = payload.jsonSettings?.theme;

				if (jsonSettingsTheme && jsonSettingsTheme !== theme) {
					onChangeTheme(jsonSettingsTheme);
					localStorage.setItem(LOCAL_STORAGE_THEME_KEY, jsonSettingsTheme);
				}
			}

			const prevDesign = localStorage.getItem(DESIGN_STORAGE_THEME_KEY);
			if (prevDesign) document.body.classList.remove(prevDesign);

			localStorage.setItem(DESIGN_STORAGE_THEME_KEY, 'app-design-v2');
			document.body.classList.add('app-design-v2');
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	return (
		<Suspense fallback=''>
        					{userLoading ? (
        						<PageLoader />
        					) : (
        						<MainLayout header={<Navbar />} content={<AppRouter />} sidebar={<Sidebar />} />
        					)}
        				</Suspense>
	);
}

export default App;
