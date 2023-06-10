import { FC, memo } from 'react';
import LightThemeIcon from 'shared/assets/icons/theme-light.svg';
import ThemeIcon from 'shared/assets/img/theme.svg';
import DarkThemeIcon from 'shared/assets/icons/theme-dark.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Theme } from '@/shared/const/theme';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import useTheme from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { IconButton } from '@/shared/ui/designV2/Icon/IconButton';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ className }) => {
	const { toggleTheme, theme } = useTheme();
	const dispatch = useAppDispatch();

	const onToggleTheme = () => {
		toggleTheme((theme) => {
			dispatch(
				saveJsonSettings({
					theme,
				}),
			);
			localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
		});
	};

	return (
		<IconButton
        					width={30}
        					height={30}
        					Svg={ThemeIcon}
        					className={classNames('', {}, [className])}
        					onClick={onToggleTheme}
        				/>
	);
});
