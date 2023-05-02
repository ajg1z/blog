import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import { Button } from '@/shared/ui/Button';
import LightThemeIcon from '../../../shared/assets/icons/theme-light.svg';
import DarkThemeIcon from '../../../shared/assets/icons/theme-dark.svg';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ className }) => {
    const { toggleTheme, theme } = useTheme();

    return (
        <Button theme='clear' className={classNames('', {}, [className])} onClick={toggleTheme}>
            {theme === Theme.LIGHT ? <LightThemeIcon /> : <DarkThemeIcon />}
        </Button>
    );
});
