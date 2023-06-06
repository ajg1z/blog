/* eslint-disable react/no-unused-prop-types */
import { ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, ReactNode, useState } from 'react';
import { ClassNamesMods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { HStack } from '../Stack';

type InputSize = 'medium' | 'large';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	className?: string;
	autofocus?: boolean;
	addonLeft?: ReactNode;
	addonRight?: ReactNode;
	size?: InputSize;
	onChangeValue?: (value: string) => void;
	getRef?: (ref: HTMLInputElement | null) => void;
}

export const Input = memo((props: InputProps) => {
	const {
		onChange,
		className,
		getRef,
		onChangeValue,
		addonLeft,
		addonRight,
		autofocus,
		readOnly,
		disabled,
		size = 'medium',
		...otherProps
	} = props;

	const inputRef = useRef<HTMLInputElement | null>(null);

	const [isFocus, setIsFocus] = useState(false);

	useEffect(() => {
		if (autofocus && inputRef.current) {
			inputRef.current.focus();
		}
	}, [autofocus]);

	useEffect(() => {
		if (getRef) getRef(inputRef.current);
		return () => {
			if (getRef) getRef(null);
		};
	}, [getRef]);

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e);
		onChangeValue?.(e.target.value);
	};

	const onFocus = () => {
		setIsFocus(true);
	};

	const onBlur = () => {
		setIsFocus(false);
	};

	const mods: ClassNamesMods = {
		[cls.withAddonLeft]: Boolean(addonLeft),
		[cls.withAddonRight]: Boolean(addonRight),
		[cls.focused]: isFocus,
		[cls.readOnly]: Boolean(readOnly),
		[cls.disabled]: Boolean(disabled),
	};

	return (
		<HStack gap={4} className={classNames(cls.InputWrapper, mods, [className, cls[size]])}>
			{addonLeft && <HStack className={cls.addonLeft}>{addonLeft}</HStack>}
			<input
				onChange={onChangeInput}
				onFocus={onFocus}
				onBlur={onBlur}
				readOnly={readOnly}
				disabled={disabled}
				ref={inputRef}
				className={cls.Input}
				{...otherProps}
			/>
			{addonRight && <HStack className={cls.addonRight}>{addonRight}</HStack>}
		</HStack>
	);
});
