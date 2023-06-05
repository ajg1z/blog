import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

type CardVariant = 'normal' | 'outline' | 'light';

type CardPadding = 0 | 8 | 10 | 16 | 24;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: ReactNode;
	variant?: CardVariant;
	padding?: CardPadding;
}

export const Card = (props: PropsWithChildren<CardProps>) => {
	const { className, children, padding = 10, variant = 'normal', ...otherProps } = props;

	return (
		<div className={classNames(cls.Card, {}, [className, cls[variant], cls[`padding_${padding}`]])} {...otherProps}>
			{children}
		</div>
	);
};
