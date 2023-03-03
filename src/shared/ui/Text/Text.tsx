import { classNames } from 'shared/lib/classNames/classNames';
import { memo, PropsWithChildren } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

interface TextProps {
    className?: string;
    text?: string;
    title?: string;
    theme?: TextTheme;
}

export const Text = memo((props: PropsWithChildren<TextProps>) => {
    const { className, text, title, theme = TextTheme.PRIMARY } = props;

    return (
        <div className={classNames(cls.Text, {}, [className, cls[theme]])}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
