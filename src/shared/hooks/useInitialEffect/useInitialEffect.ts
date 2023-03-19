import { useEffect } from 'react';

export const useInitialEffect = (callback: () => void) => {
    useEffect(() => {
        if (__ENVIRONMENT__ !== 'storybook') callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
