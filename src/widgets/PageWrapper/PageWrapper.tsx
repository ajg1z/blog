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
import { PageWrapperId } from 'shared/const/id';
import cls from './PageWrapper.module.scss';

interface PageWrapperProps {
    className?: string;
    children?: ReactNode;
    onScrollEnd?: () => void;
    saveScrollPosition?: boolean;
}

export const PageWrapper = (props: PropsWithChildren<PageWrapperProps>) => {
    const { className, children, onScrollEnd, saveScrollPosition = true } = props;

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    if (saveScrollPosition) {
        // eslint-disable-next-line
        const scrollPosition = useSelector(
            (state: StateSchema) => getScrollPositionByPath(state, pathname),
            // eslint-disable-next-line function-paren-newline
        );

        // eslint-disable-next-line
        useInitialEffect(() => {
            wrapperRef.current.scrollTop = scrollPosition;
        });
    }

    if (onScrollEnd) {
        // eslint-disable-next-line
        useInfiniteScroll({
            callback: onScrollEnd,
            triggerRef,
            wrapperRef,
        });
    }

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
            id={PageWrapperId}
            ref={wrapperRef}
            className={classNames(cls.PageWrapper, {}, [className])}
            onScroll={saveScrollPosition ? onScroll : undefined}
        >
            {children}
            {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
        </section>
    );
};
