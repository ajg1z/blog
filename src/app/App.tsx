import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { classNames } from '@/shared/lib/classNames/classNames';
import { checkAuth, getUserLoading } from '@/entities/User';
import { PageLoader } from '@/widgets/PageLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import useTheme from '@/shared/lib/hooks/useTheme/useTheme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

function App() {
	const dispatch = useAppDispatch();
	const userLoading = useSelector(getUserLoading);
	const { theme, onChangeTheme } = useTheme();

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
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	return (
		<div className={classNames('app')}>
			<Suspense fallback=''>
				{userLoading ? (
					<PageLoader />
				) : (
					<>
						<Navbar />
						<div className='content-page'>
							<Sidebar />
							<AppRouter />
						</div>
					</>
				)}
			</Suspense>
		</div>
	);
}

export default App;
