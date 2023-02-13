import { FC } from 'react';
import { classNames } from 'shared/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => (
    <div className={classNames(cls.Navbar, {}, [className])}>
        <div className={cls.links}>
            <AppLink to='/'>Main</AppLink>
            <AppLink to='/about'>About</AppLink>
        </div>
    </div>
);
