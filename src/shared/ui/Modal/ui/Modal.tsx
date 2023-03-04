import { FC, useCallback, useEffect } from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import { useMount } from '../lib/useMount';
import { Layout } from './Layout';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    width?: number;
    height?: number;
    className?: string;
}

export const ModalAnimationTime = 300;

export const Modal: FC<ModalProps> = (props) => {
    const { children, className, isOpen, width, onClose, height } = props;
    const { mounted } = useMount(isOpen);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        },
        [handleClose],
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            if (!isOpen) window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    if (!mounted) return null;

    return (
        <Portal>
            <Layout
                onClose={handleClose}
                className={className}
                height={height}
                isOpen={isOpen}
                width={width}
            >
                {children}
            </Layout>
        </Portal>
    );
};
