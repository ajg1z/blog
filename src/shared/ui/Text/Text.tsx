import { classNames } from 'shared/lib/classNames/classNames';
import { memo, PropsWithChildren } from 'react';
import cls from './Text.module.scss';

type TextTheme = 'primary' | 'error';
type TextAlign = 'left' | 'center' | 'right';
type TextSize = 'M' | 'L' | 'S';
type HeaderTag = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTag> = {
    S: 'h3',
    M: 'h2',
    L: 'h1',
};

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
    const HeaderTag = mapSizeToHeaderTag[size];

    return (
        <div className={classNames(cls.Text, {}, [className, cls[theme], cls[align], cls[size]])}>
            {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
