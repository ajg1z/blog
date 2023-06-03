/* eslint-disable indent */
import { useContext } from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';

interface UseThemeResult {
	toggleTheme: (saveAction: (theme: Theme) => void) => void;
	theme: Theme;
	onChangeTheme: (theme: Theme) => void;
}

const useTheme = (): UseThemeResult => {
	const { theme, setTheme } = useContext(ThemeContext);

	const onChangeTheme = (newTheme: Theme) => {
		setTheme?.(newTheme);
		if (theme) document.body.classList.remove(theme);
		document.body.classList.add(newTheme);
	};

	function toggleTheme(saveAction?: (theme: Theme) => void) {
		let newTheme: Theme;
		switch (theme) {
			case Theme.DARK:
				newTheme = Theme.LIGHT;
				break;
			case Theme.LIGHT:
				newTheme = Theme.ORANGE;
				break;
			case Theme.ORANGE:
				newTheme = Theme.DARK;
				break;
			default:
				newTheme = Theme.LIGHT;
		}

		onChangeTheme(newTheme);
		saveAction?.(newTheme);
	}

	return {
		theme: theme || Theme.LIGHT,
		toggleTheme,
		onChangeTheme,
	};
};

export default useTheme;
