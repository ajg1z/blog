import { useMemo, useState, FC } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

const defaultTheme =
	(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

const ThemeProvider: FC = ({ children }) => {
	const [theme, setTheme] = useState<Theme>(defaultTheme);

	const value = useMemo(() => {
		return {
			theme,
			setTheme,
		};
	}, [theme]);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export default ThemeProvider;
