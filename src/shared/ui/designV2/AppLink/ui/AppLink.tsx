/* eslint-disable react/no-unused-prop-types */
import { FC, ReactNode, forwardRef, memo } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
	className?: string;
	activeClassName?: string;
	variant?: AppLinkVariant;
	children: ReactNode;
}

export const AppLink: FC<AppLinkProps> = memo(
	forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
		const { className, children, variant = 'primary', activeClassName = '', ...otherProps } = props;

		return (
			<NavLink
				ref={ref}
				className={({ isActive }) =>
					classNames(cls.AppLink, { [activeClassName]: isActive }, [className, cls[variant]])
				}
				{...otherProps}
			>
				{children}
			</NavLink>
		);
	}),
);
