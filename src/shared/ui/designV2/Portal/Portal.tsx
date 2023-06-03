import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    container?: HTMLElement;
    children: ReactNode;
}

export const Portal: FC<PortalProps> = (props) => {
    const { container = document.body, children } = props;

    return createPortal(children, container);
};
