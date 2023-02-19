import { useState, useEffect } from 'react';
import { ModalAnimationTime } from '../ui/Modal';

export const useMount = (opened: boolean) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        let timerId: null | NodeJS.Timeout = null;
        if (opened && !mounted) {
            setMounted(true);
        } else if (!opened && mounted) {
            timerId = setTimeout(() => {
                if (setMounted) setMounted(false);
            }, ModalAnimationTime);
        }
        return () => {
            if (timerId) clearTimeout(timerId);
        };
    }, [mounted, opened]);

    return { mounted };
};
