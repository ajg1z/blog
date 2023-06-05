import { ChangeEvent, PropsWithChildren, TextareaHTMLAttributes, memo, useState } from 'react';
import cls from './Input.module.scss';
import { ClassNamesMods, classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../Stack';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string;
	onChangeValue?: (value: string) => void;
}

export const TextArea = memo((props: PropsWithChildren<TextAreaProps>) => {
	const { className, onChange, onChangeValue, readOnly, disabled, ...otherProps } = props;

	const [isFocus, setIsFocus] = useState(false);

	const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
		[cls.focused]: isFocus,
		[cls.readonly]: readOnly,
		[cls.disabled]: disabled,
	};

	return (
		<HStack className={classNames(cls.InputWrapper, mods, [className])}>
			<textarea
				onFocus={onFocus}
				onBlur={onBlur}
				readOnly={readOnly}
				disabled={disabled}
				onChange={onChangeTextArea}
				className={classNames(cls.TextArea, {}, [className])}
				{...otherProps}
			/>
		</HStack>
	);
});
