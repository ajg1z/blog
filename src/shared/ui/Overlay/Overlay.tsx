import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, PropsWithChildren, memo } from 'react';
import cls from './Overlay.module.scss';

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    onClick?: () => void;
}

export const Overlay = memo((props: PropsWithChildren<OverlayProps>) => {
    const { className, onClick, ...divProps } = props;

    return (
        <div
            {...divProps}
            onClick={onClick}
            aria-hidden='true'
            className={classNames(cls.Overlay, {}, [className])}
        />
    );
});
