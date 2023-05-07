import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
}

export const useInfiniteScroll = (props: UseInfiniteOptions) => {
    const { callback, triggerRef, wrapperRef } = props;

    useEffect(() => {
        if (!callback) return;

        const localTriggerRef = triggerRef.current;

        const options = {
            root: wrapperRef.current,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback();
            }
        }, options);

        observer.observe(localTriggerRef);

        // eslint-disable-next-line consistent-return
        return () => {
            if (localTriggerRef) observer.unobserve(localTriggerRef);
        };
    }, [callback, triggerRef, wrapperRef]);
};
