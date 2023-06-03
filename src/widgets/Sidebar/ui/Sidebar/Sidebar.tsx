import { useState, FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/deprecated/Button';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { HStack, VStack } from '@/shared/ui/designV2/Stack';
import { SidebarItem } from '../../ui/SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import { getSidebarLinkList } from '../../model/selectors/getSidebarList';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { AppLogo } from '@/shared/ui/designV2/AppLogo';
import { IconButton } from '@/shared/ui/designV2/Icon/IconButton';
import ArrowBottomIcon from '@/shared/assets/img/arrow-bottom.svg';

interface SidebarProps {
	className?: string;
}

export const Sidebar: FC<SidebarProps> = memo((props) => {
	const { className } = props;

	const [collapsed, setCollapsed] = useState(false);
	const sidebarListLink = useSelector(getSidebarLinkList);

	async function onToggle() {
		setCollapsed((state) => !state);
	}

	return (
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={
				<menu
					aria-label='sidebar'
					className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
				>
					<Button
						theme='backgroundInverted'
						className={cls.collapseBtn}
						data-testid='toggle-btn'
						onClick={onToggle}
						square
						size='L'
					>
						{collapsed ? '>' : '<'}
					</Button>

					<VStack className={cls.items} gap={24} role='navigation'>
						{sidebarListLink.map((item) => (
							<SidebarItem item={item} key={item.path} />
						))}
					</VStack>

					<HStack className={cls.switchers} gap={8} max justify='center'>
						<ThemeSwitcher />
						<LangSwitcher isShort={collapsed} />
					</HStack>
				</menu>
			}
			on={
				<VStack
					aria-label='sidebar'
					className={classNames(cls.SidebarDesignV2, { [cls.collapsed]: collapsed }, [className])}
				>
					<AppLogo className={cls.appLogo} />

					<VStack className={cls.items} gap={8} role='navigation' max align='start'>
						{sidebarListLink.map((item) => (
							<SidebarItem item={item} key={item.path} />
						))}
					</VStack>

					<HStack className={cls.switchers} gap={8} max justify='center'>
						<ThemeSwitcher />
						<LangSwitcher isShort={collapsed} />
					</HStack>

					<IconButton
						Svg={ArrowBottomIcon}
						className={classNames(cls.collapseBtn, { [cls.collapsed]: collapsed })}
						data-testid='toggle-btn'
						onClick={onToggle}
					/>
				</VStack>
			}
		/>
	);
});
