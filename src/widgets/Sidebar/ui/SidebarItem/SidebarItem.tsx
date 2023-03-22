import { useTranslation } from 'react-i18next';

import { memo, PropsWithChildren } from 'react';
import { AppLink } from 'shared/ui/AppLink';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import cls from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/types/sidebar';

interface SidebarItemProps {
    item: SidebarItemType;
}

export const SidebarItem = memo((props: PropsWithChildren<SidebarItemProps>) => {
    const { item } = props;
    const { t } = useTranslation();
    const isAuth = useSelector(getUserData);

    if (!isAuth && item.authOnly) return null;

    return (
        <AppLink to={item.path} className={cls.item}>
            <item.Icon className={cls.icon} />
            <span>{t(`navbar.${item.text}`)}</span>
        </AppLink>
    );
});
