import { FC, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { classNames } from 'shared/lib/classNames/classNames';
import { ModalAnimationTime } from './Modal';
import cls from './Modal.module.scss';

interface LayoutProps {
    width?: number;
    height?: number;
    onClose: () => void;
    className?: string;
    isOpen: boolean;
}

const overlayAnimation = {
    enter: cls.overlayEnter,
    enterActive: cls.overlayEnterActive,
    exit: cls.overlayExit,
    exitActive: cls.overlayExitActive,
};

const contentAnimation = {
    enter: cls.contentEnter,
    enterActive: cls.contentEnterActive,
    exit: cls.contentExit,
    exitActive: cls.contentExitActive,
};

export const Layout: FC<LayoutProps> = (props) => {
    const { onClose, children, height, width, className, isOpen } = props;

    const overlayRef = useRef<null | HTMLDivElement>(null);
    const contentRef = useRef<null | HTMLDivElement>(null);

    const [animationIn, setAnimationIn] = useState(false);

    useEffect(() => {
        setAnimationIn(isOpen);
    }, [isOpen]);

    return (
        <div className={classNames(cls.Modal, {}, [className])}>
            <CSSTransition
                timeout={ModalAnimationTime}
                mountOnEnter
                unmountOnExit
                nodeRef={overlayRef}
                classNames={overlayAnimation}
                in={animationIn}
            >
                <div ref={overlayRef} onClick={onClose} className={cls.overlay} />
            </CSSTransition>

            <CSSTransition
                timeout={ModalAnimationTime}
                mountOnEnter
                unmountOnExit
                nodeRef={contentRef}
                classNames={contentAnimation}
                in={animationIn}
            >
                <div
                    ref={contentRef}
                    style={{ width: width ?? 'auto', height: height ?? 'auto' }}
                    className={cls.content}
                >
                    {children}
                </div>
            </CSSTransition>
        </div>
    );
};
