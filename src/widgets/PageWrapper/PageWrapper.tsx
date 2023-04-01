import { PropsWithChildren, ReactNode, useRef, MutableRefObject, UIEvent } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { getScrollPositionByPath, scrollRecoveryActions } from 'features/ScrollRecovery';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/hooks/useInitialEffect/useInitialEffect';
import { StateSchema } from 'app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { useThrottle } from 'shared/hooks/useThrottle/useThrottle';
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

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const scrollPosition = useSelector(
        (state: StateSchema) => getScrollPositionByPath(state, pathname),
        // eslint-disable-next-line function-paren-newline
    );

    useInfiniteScroll({
        callback: onScrollEnd,
        triggerRef,
        wrapperRef,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent) => {
        dispatch(
            scrollRecoveryActions.setScrollPosition({
                path: pathname,
                position: e.currentTarget.scrollTop,
            }),
        );
    }, 500);

    return (
        <section
            ref={wrapperRef}
            className={classNames(cls.PageWrapper, {}, [className])}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
        </section>
    );
};
