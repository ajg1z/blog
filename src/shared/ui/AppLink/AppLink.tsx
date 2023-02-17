import { classNames } from 'shared/lib/classNames/classNames';
import { FC } from 'react';
import { LinkProps, Link } from 'react-router-dom';
import cls from './AppLink.module.scss';

export enum ThemeAppLink {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: ThemeAppLink;
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const { className, children, theme = ThemeAppLink.PRIMARY, ...rest } = props;

    return (
        <Link
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            {children}
        </Link>
    );
};
