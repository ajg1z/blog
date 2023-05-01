import { FC, Fragment, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Overlay } from 'shared/ui/Overlay';
import { Dialog, Transition } from '@headlessui/react';
import cls from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    width?: number;
    height?: number;
    className?: string;
    children?: ReactNode;
    title?: string;
    description?: string;
    unmount?: boolean;
}

export const Modal: FC<ModalProps> = (props) => {
    const { children, description, unmount, className, title, isOpen, width, onClose, height } =
        props;

    return (
        <Transition show={isOpen}>
            <Dialog className={cls.Modal} unmount={unmount} onClose={onClose}>
                <Transition.Child
                    enterFrom={cls.overlayEnter}
                    enterTo={cls.overlayEnterActive}
                    leaveFrom={cls.overlayExit}
                    as={Fragment}
                    leaveTo={cls.overlayExitActive}
                >
                    <Overlay />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enterFrom={cls.contentEnter}
                    enterTo={cls.contentEnterActive}
                    leaveFrom={cls.contentExit}
                    leaveTo={cls.contentExitActive}
                >
                    <Dialog.Panel
                        style={{ width, height }}
                        className={classNames(cls.panel, {}, [className])}
                    >
                        {title && <Dialog.Title className={cls.title}>{title}</Dialog.Title>}
                        {description && <Dialog.Description>{description}</Dialog.Description>}
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};
