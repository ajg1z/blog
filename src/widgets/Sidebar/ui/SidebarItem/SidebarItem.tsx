import { useTranslation } from 'react-i18next';

import { memo, PropsWithChildren } from 'react';
import { AppLink } from 'shared/ui/AppLink';
import { SidebarItemType } from 'widgets/Sidebar/model/items';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
}

export const SidebarItem = memo((props: PropsWithChildren<SidebarItemProps>) => {
    const { item } = props;
    const { t } = useTranslation();

    return (
        <AppLink to={item.path} className={cls.item}>
            <item.Icon className={cls.icon} />
            <span>{t(`navbar.${item.text}`)}</span>
        </AppLink>
    );
});
