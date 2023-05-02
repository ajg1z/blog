import { FC, memo } from 'react';
import { LinkProps, Link } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

type ThemeAppLink = 'primary' | 'secondary';

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: ThemeAppLink;
}

export const AppLink: FC<AppLinkProps> = memo((props) => {
    const { className, children, theme = 'primary', ...rest } = props;

    return (
        <Link {...rest} className={classNames(cls.AppLink, {}, [className, cls[theme]])}>
            {children}
        </Link>
    );
});
