import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useCallback } from 'react';
import { Dropdown } from 'shared/ui/Dropdown';
import { Avatar } from 'shared/ui/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, isUserAdmin, isUserManager, userActions } from 'entities/User';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { TokenLocalStorageKey } from 'shared/const/localStorage';
import { classNames } from 'shared/lib/classNames/classNames';
import { Placement } from '@floating-ui/react';
import cls from './AvatarDropdown.module.scss';

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
    }, [dispatch]);

    if (!user) {
        return null;
    }

    const isAdminPanel = isAdmin || isManager;

    const dropdownItems = [
        {
            id: '2',
            href: RoutePaths.profile + user.id,
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
            href: RoutePaths.adminPanel,
            content: t('navbar.admin'),
        });
    }

    return (
        <Dropdown
            trigger={<Avatar size={30} src={user.avatar} />}
            className={classNames('', {}, [className])}
            placement={placement}
            items={dropdownItems}
        />
    );
});
