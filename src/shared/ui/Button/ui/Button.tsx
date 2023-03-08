import { classNames, ClassNamesMods } from 'shared/lib/classNames/classNames';
import { FC, ButtonHTMLAttributes, memo } from 'react';
import cls from './Button.module.scss';

export type ButtonTheme =
    | 'primary'
    | 'clear'
    | 'clearInverted'
    | 'outline'
    | 'outlineRed'
    | 'background'
    | 'backgroundInverted';

export type ButtonSize = 'M' | 'L' | 'XL';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
}

export const Button: FC<ButtonProps> = memo((props) => {
    const { className, children, theme = 'primary', square, size = 'M', ...otherProps } = props;

    const mods: ClassNamesMods = {
        [cls.square]: square,
    };

    return (
        <button
            type='button'
            className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        >
            {children}
        </button>
    );
});
