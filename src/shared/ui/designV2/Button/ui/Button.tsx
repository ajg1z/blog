/* eslint-disable react/no-unused-prop-types */
import { ButtonHTMLAttributes, memo, forwardRef } from 'react';
import { classNames, ClassNamesMods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'outline' | 'clear';

export type ButtonSize = 'M' | 'L' | 'XL';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	variant?: ButtonVariant;
	square?: boolean;
	size?: ButtonSize;
}

export const Button = memo(
	forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
		const { className, children, disabled, variant = 'outline', square, size = 'M', ...otherProps } = props;

		const mods: ClassNamesMods = {
			[cls.square]: square,
		};

		return (
			<button
				type='button'
				{...otherProps}
				ref={ref}
				className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])}
			>
				{children}
			</button>
		);
	}),
);
