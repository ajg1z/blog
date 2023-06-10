import { PropsWithChildren, ReactNode, useRef, MutableRefObject, UIEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getScrollPositionByPath, scrollRecoveryActions } from '@/features/ScrollRecovery';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { PageWrapperId } from '@/shared/const/id';
import cls from './PageWrapper.module.scss';
import { TestProps } from '@/shared/types/tests';
import { toggleFeature } from '@/shared/lib/featureFlags';

interface PageWrapperProps extends TestProps {
	className?: string;
	children?: ReactNode;
	onScrollEnd?: () => void;
	saveScrollPosition?: boolean;
}

export const PageWrapper = (props: PropsWithChildren<PageWrapperProps>) => {
	const { className, children, onScrollEnd, 'data-testid': dataTestId, saveScrollPosition = true } = props;

	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

	const dispatch = useAppDispatch();
	const { pathname } = useLocation();

	const scrollPosition = useSelector((state: StateSchema) => getScrollPositionByPath(state, pathname));

	useInitialEffect(() => {
		if (saveScrollPosition) wrapperRef.current.scrollTop = scrollPosition;
	});

	useInfiniteScroll({
		callback: onScrollEnd,
		triggerRef,
		wrapperRef,
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
			data-testid={dataTestId}
			id={PageWrapperId}
			ref={wrapperRef}
			className={classNames(
				cls.DesignV2PageWrapper,
				{},
				[className],
			)}
			onScroll={saveScrollPosition ? onScroll : undefined}
		>
			{children}
			{onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
		</section>
	);
};
