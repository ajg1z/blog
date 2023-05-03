import { computePosition, flip, shift, Placement } from '@floating-ui/react';
import { MutableRefObject } from 'react';

export const useCalculatePosition = (
    triggerRef: MutableRefObject<HTMLButtonElement | null>,
    placement: Placement,
) => {
    const calculatePosition = async (ref: HTMLDivElement | null) => {
        if (triggerRef.current && ref) {
            const { x, y } = await computePosition(triggerRef.current, ref, {
                middleware: [flip(), shift()],
                placement,
                strategy: 'absolute',
            });

            if (ref?.style) {
                Object.assign(ref.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                });
            }
        }
    };

    return calculatePosition;
};
