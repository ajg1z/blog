import type { PropsWithChildren } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
    className?: string;
    onClose?: () => void;
    isOpen?: boolean;
}

export function LoginModal(props: PropsWithChildren<LoginModalProps>) {
    const { className, isOpen, onClose } = props;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={classNames('', {}, [className])}
            width={400}
        >
            <LoginForm />
        </Modal>
    );
}
