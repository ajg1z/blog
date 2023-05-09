/* eslint-disable indent */
import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    function toggleTheme() {
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
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        document.body.className = newTheme;
        setTheme?.(newTheme);
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
};

export default useTheme;
