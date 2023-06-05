/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unused-prop-types */
import { ButtonHTMLAttributes, memo, forwardRef, ReactNode } from 'react';
import { classNames, ClassNamesMods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { HStack } from '../../Stack';

export type ButtonVariant = 'outline' | 'clear' | 'filled';

export type ButtonSize = 'M' | 'L' | 'XL';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	variant?: ButtonVariant;
	square?: boolean;
	size?: ButtonSize;
	addonLeft?: ReactNode;
	addonRight?: ReactNode;
}

export const Button = memo(
	forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
		const {
			className,
			children,
			disabled,
			variant = 'outline',
			square,
			size = 'M',
			addonLeft,
			addonRight,
			...otherProps
		} = props;

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
				{addonLeft && <HStack className={cls.addonLeft}>{addonLeft}</HStack>}
				<>{children}</>
				{addonRight && <HStack className={cls.addonRight}>{addonRight}</HStack>}
			</button>
		);
	}),
);
