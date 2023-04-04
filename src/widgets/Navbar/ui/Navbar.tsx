import { getUserData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { TokenLocalStorageKey } from 'shared/const/localStorage';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink';
import { Button } from 'shared/ui/Button';
import { Text } from 'shared/ui/Text';
import { Dropdown } from 'shared/ui/Dropdown';
import { Avatar } from 'shared/ui/Avatar';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const { t } = useTranslation();
    const { t: articleT } = useTranslation('article');
    const { t: profileT } = useTranslation('profile');
    const user = useSelector(getUserData);
    const dispatch = useDispatch();

    const closeAuthModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const openAuthModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        localStorage.removeItem(TokenLocalStorageKey);
        dispatch(userActions.logout());
    }, [dispatch]);

    if (user) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text title={t('logo')} className={cls.logo} />
                <AppLink to={RoutePaths.articleCreate} className={cls.createArticle}>
                    {articleT('createArticle')}
                </AppLink>
                <Dropdown
                    trigger={<Avatar size={30} src={user.avatar} />}
                    className={cls.dropdown}
                    placement='bottom-start'
                    items={[
                        {
                            id: 1,
                            href: RoutePaths.profile + user.id,
                            content: profileT('title'),
                        },
                        {
                            id: 2,
                            onClick: onLogout,
                            content: t('logout'),
                        },
                    ]}
                />
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button className={cls.logout} theme='clearInverted' onClick={openAuthModal}>
                {t('sign')}
            </Button>
            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={closeAuthModal} />}
        </header>
    );
});
