/* eslint-disable react/no-unused-prop-types */
import { FC, forwardRef, memo } from 'react';
import { LinkProps, Link } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

type ThemeAppLink = 'primary' | 'secondary';

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: ThemeAppLink;
}

export const AppLink: FC<AppLinkProps> = memo(
    forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
        const { className, children, theme = 'primary', ...rest } = props;

        return (
            <Link
                {...rest}
                ref={ref}
                className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            >
                {children}
            </Link>
        );
    }),
);
