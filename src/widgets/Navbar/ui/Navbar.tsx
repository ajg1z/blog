import { FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink as DeprecatedAppLink } from '@/shared/ui/deprecated/AppLink';
import { Button as DeprecatedButton } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/designV2/Button';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';

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
			<header className={classNames(cls.NavbarDesignV2, {}, [className])}>
            						<HStack gap={24} className={cls.actions}>
            							<NotificationButton />
            							<AvatarDropdown />
            						</HStack>
            					</header>
		);
	}

	return (
		<header className={classNames(cls.NavbarDesignV2, {}, [className])}>
        					<Button className={cls.logout} variant='clear' onClick={openAuthModal}>
        						{t('sign')}
        					</Button>
        					<LoginModal isOpen={isAuthModal} onClose={closeAuthModal} />
        				</header>
	);
});
