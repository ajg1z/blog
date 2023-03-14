import { classNames } from 'shared/lib/classNames/classNames';
import { memo, PropsWithChildren } from 'react';
import cls from './Text.module.scss';

type TextTheme = 'primary' | 'error';
type TextAlign = 'left' | 'center' | 'right';
type TextSize = 'M' | 'L';

interface TextProps {
    className?: string;
    text?: string;
    title?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
}

export const Text = memo((props: PropsWithChildren<TextProps>) => {
    const { className, text, title, align = 'left', theme = 'primary', size = 'M' } = props;

    return (
        <div className={classNames(cls.Text, {}, [className, cls[theme], cls[align], cls[size]])}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
