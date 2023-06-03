import { memo, PropsWithChildren, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { CircleLoader } from '@/shared/ui/deprecated/CircleLoader';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
	className?: string;
	onClose: () => void;
	isOpen: boolean;
}

export const LoginModal = memo((props: PropsWithChildren<LoginModalProps>) => {
	const { className, isOpen, onClose } = props;
	const { t } = useTranslation();

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className={classNames('', {}, [className])}
			width={400}
			title={t('formAuth')}
		>
			<Suspense fallback={<CircleLoader />}>
				<LoginFormAsync onSuccess={onClose} />
			</Suspense>
		</Modal>
	);
});
