import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, ReactNode, useRef, MutableRefObject } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll/useInfiniteScroll';
import cls from './PageWrapper.module.scss';

interface PageWrapperProps {
    className?: string;
    children?: ReactNode;
    onScrollEnd?: () => void;
}

export const PageWrapper = (props: PropsWithChildren<PageWrapperProps>) => {
    const { className, children, onScrollEnd } = props;

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        callback: onScrollEnd,
        triggerRef,
        wrapperRef,
    });

    return (
        <section ref={wrapperRef} className={classNames(cls.PageWrapper, {}, [className])}>
            {children}
            <div ref={triggerRef} />
        </section>
    );
};
