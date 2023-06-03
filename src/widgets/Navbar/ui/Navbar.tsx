import { FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button } from '@/shared/ui/deprecated/Button';
import { Text } from '@/shared/ui/deprecated/Text';

import { HStack } from '@/shared/ui/designV2/Stack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import cls from './Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/const/router';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';

interface NavbarProps {
	className?: string;
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
	const [isAuthModal, setIsAuthModal] = useState(false);
	const { t } = useTranslation();
	const { t: articleT } = useTranslation('article');

	const user = useSelector(getUserData);

	const closeAuthModal = useCallback(() => {
		setIsAuthModal(false);
	}, []);

	const openAuthModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);

	if (user) {
		return (
			<ToggleFeatureComponent
				name='isAppRedesigned'
				on={
					<header className={classNames(cls.NavbarDesignV2, {}, [className])}>
						<HStack gap={24} className={cls.actions}>
							<NotificationButton />
							<AvatarDropdown />
						</HStack>
					</header>
				}
				off={
					<header className={classNames(cls.Navbar, {}, [className])}>
						<Text title={t('logo')} className={cls.logo} />
						<AppLink to={getRouteArticleCreate()} className={cls.createArticle}>
							{articleT('createArticle')}
						</AppLink>
						<HStack gap={24} className={cls.actions}>
							<NotificationButton />
							<AvatarDropdown />
						</HStack>
					</header>
				}
			/>
		);
	}

	return (
		<header className={classNames(cls.Navbar, {}, [className])}>
			<Button className={cls.logout} theme='clearInverted' onClick={openAuthModal}>
				{t('sign')}
			</Button>
			<LoginModal isOpen={isAuthModal} onClose={closeAuthModal} />
		</header>
	);
});
