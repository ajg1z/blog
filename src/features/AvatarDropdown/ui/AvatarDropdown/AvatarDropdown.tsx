import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Placement } from '@floating-ui/react';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Dropdown';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { getUserData, isUserAdmin, isUserManager, userActions } from '@/entities/User';
import { TokenLocalStorageKey } from '@/shared/const/localStorage';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ButtonProps } from '@/shared/ui/deprecated/Button';
import { getRouteAdminPanel, getRouteProfile, getRouteSettings } from '@/shared/const/router';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { Avatar } from '@/shared/ui/designV2/Avatar';
import { Dropdown } from '@/shared/ui/designV2/Dropdown';

interface AvatarDropdownProps {
	className?: string;
	placement?: Placement;
}

export const AvatarDropdown = memo((props: PropsWithChildren<AvatarDropdownProps>) => {
	const { className, placement = 'bottom-start' } = props;
	const { t } = useTranslation();

	const isAdmin = useSelector(isUserAdmin);
	const isManager = useSelector(isUserManager);
	const user = useSelector(getUserData);
	const dispatch = useDispatch();

	const onLogout = useCallback(() => {
		localStorage.removeItem(TokenLocalStorageKey);
		dispatch(userActions.logout());
		window.location.reload();
	}, [dispatch]);

	if (!user) {
		return null;
	}

	const isAdminPanel = isAdmin || isManager;

	const dropdownItems = [
		{
			id: '4',
			href: getRouteSettings(),
			content: t('navbar.settings'),
		},
		{
			id: '2',
			href: getRouteProfile(user.id),
			content: t('navbar.profile'),
		},
		{
			id: '3',
			onClick: onLogout,
			content: t('logout'),
		},
	];

	if (isAdminPanel) {
		dropdownItems.unshift({
			id: '1',
			href: getRouteAdminPanel(),
			content: t('navbar.admin'),
		});
	}

	const triggerProps: ButtonProps = {
		theme: 'clear',
	};

	return (
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={
				<DropdownDeprecated
					trigger={<AvatarDeprecated size={20} src={user.avatar} />}
					triggerProps={triggerProps}
					className={classNames('', {}, [className])}
					placement={placement}
					items={dropdownItems}
				/>
			}
			on={
				<Dropdown
					trigger={<Avatar size={40} src={user.avatar} />}
					triggerProps={triggerProps}
					className={classNames('', {}, [className])}
					placement={placement}
					items={dropdownItems}
				/>
			}
		/>
	);
});
