/* eslint-disable react/no-unused-prop-types */
import { InputHTMLAttributes, memo, useEffect, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

export type InputTheme = 'background' | 'backgroundInverted' | 'outline';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    theme?: InputTheme;
    autofocus?: boolean;
    getRef?: (ref: HTMLInputElement | null) => void;
}

export const Input = memo((props: InputProps) => {
    // eslint-disable-next-line react/prop-types
    const { className, getRef, theme = 'background', autofocus, ...otherProps } = props;
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

    return (
        <input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
            ref={inputRef}
            className={classNames(cls.Input, {}, [className, cls[theme]])}
        />
    );
});
