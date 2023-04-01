import { useRef, useCallback } from 'react';

export const useThrottle = (callback: (...ags: any[]) => void, delay: number) => {
    const isThrottle = useRef(false);

    return useCallback(
        (...args: any[]) => {
            if (!isThrottle.current) {
                callback(...args);
                isThrottle.current = true;

                setTimeout(() => {
                    isThrottle.current = false;
                }, delay);
            }
        },
        [callback, delay, isThrottle],
    );
};
