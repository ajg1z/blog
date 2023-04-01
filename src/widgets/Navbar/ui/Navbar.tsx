import { getUserData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { TokenLocalStorageKey } from 'shared/const/localStorage';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink';
import { Button } from 'shared/ui/Button';
import { Text } from 'shared/ui/Text';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const { t } = useTranslation();
    const { t: articleT } = useTranslation('article');
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
                <Button className={cls.logout} theme='clearInverted' onClick={onLogout}>
                    {t('logout')}
                </Button>
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
