import { useTranslation } from 'react-i18next';

import { memo, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/designV2/AppLink';
import { getUserData } from '@/entities/User';
import { HStack } from '@/shared/ui/designV2/Stack';
import cls from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/types/sidebar';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { Icon } from '@/shared/ui/designV2/Icon';

interface SidebarItemProps {
	item: SidebarItemType;
}

export const SidebarItem = memo((props: PropsWithChildren<SidebarItemProps>) => {
	const { item } = props;
	const { t } = useTranslation();
	const isAuth = useSelector(getUserData);

	if (!isAuth && item.authOnly) return null;

	return (
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={
				<AppLinkDeprecated to={item.path} className={cls.SidebarItem}>
					<HStack gap={12}>
						<item.Icon className={cls.icon} />
						<span>{t(`navbar.${item.text}`)}</span>
					</HStack>
				</AppLinkDeprecated>
			}
			on={
				<AppLink activeClassName={cls.active} to={item.path} className={cls.DesignV2SidebarItem}>
					<HStack gap={12}>
						<Icon Svg={item.Icon} width={30} height={30} />
						<span>{t(`navbar.${item.text}`)}</span>
					</HStack>
				</AppLink>
			}
		/>
	);
});
