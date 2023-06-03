import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

type CardTheme = 'normal' | 'outline';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
    theme?: CardTheme;
}

export const Card = (props: PropsWithChildren<CardProps>) => {
    const { className, children, theme = 'normal', ...otherProps } = props;

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <div {...otherProps} className={classNames(cls.Card, {}, [className, cls[theme]])}>
            {children}
        </div>
    );
};
