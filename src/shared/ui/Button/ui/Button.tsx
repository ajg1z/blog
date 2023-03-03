import { classNames } from 'shared/lib/classNames/classNames';
import { FC, ButtonHTMLAttributes, memo } from 'react';
import cls from './Button.module.scss';

export enum ButtonTheme {
    PRIMARY = 'primary',
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'sizeM',
    L = 'sizeL',
    XL = 'sizeXl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
}

export const Button: FC<ButtonProps> = memo((props) => {
    const {
        className,
        children,
        theme = ButtonTheme.PRIMARY,
        square,
        size = ButtonSize.M,
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
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
