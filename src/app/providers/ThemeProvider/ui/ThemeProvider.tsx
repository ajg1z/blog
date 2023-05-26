import { useMemo, useState, FC, useEffect, ReactNode } from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

interface ThemeProviderProps {
	initialTheme?: Theme;
	children?: ReactNode;
}

const defaultTheme = Theme.LIGHT;

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
	const [theme, setTheme] = useState<Theme>(initialTheme ?? defaultTheme);

	useEffect(() => {
		if (!document.body.className) {
			const localeStorageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
			document.body.className = localeStorageTheme ?? defaultTheme;
		}
	}, []);

	const value = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
