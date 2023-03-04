import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    function toggleTheme() {
        const value = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, value);
        document.body.className = value;
        setTheme?.(value);
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
};

export default useTheme;
