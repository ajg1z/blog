/* eslint-disable react/no-unused-prop-types */
import { ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

export type InputTheme = 'background' | 'backgroundInverted' | 'outline';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    theme?: InputTheme;
    autofocus?: boolean;
    onChangeValue?: (value: string) => void;
    getRef?: (ref: HTMLInputElement | null) => void;
}

export const Input = memo((props: InputProps) => {
    const {
        onChange,
        className,
        getRef,
        onChangeValue,
        theme = 'background',
        autofocus,
        ...otherProps
    } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);

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

    return (
        <input
            onChange={onChangeInput}
            {...otherProps}
            ref={inputRef}
            className={classNames(cls.Input, {}, [className, cls[theme]])}
        />
    );
});
