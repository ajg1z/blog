/* eslint-disable react/no-unused-prop-types */
import { HTMLAttributes, forwardRef, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    onClick?: () => void;
}

export const Overlay = memo(
    forwardRef<HTMLDivElement, OverlayProps>((props, ref) => {
        const { className, onClick, ...divProps } = props;

        return (
            <div
                {...divProps}
                ref={ref}
                aria-hidden='true'
                className={classNames(cls.Overlay, {}, [className])}
                onClick={onClick}
            />
        );
    }),
);
