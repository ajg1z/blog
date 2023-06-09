import { memo, PropsWithChildren, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { CircleLoader } from '@/shared/ui/deprecated/CircleLoader';
import { Modal } from '@/shared/ui/designV2/Modal';
import { Modal as DeprecatedModal } from '@/shared/ui/deprecated/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';

interface LoginModalProps {
	className?: string;
	onClose: () => void;
	isOpen: boolean;
}

export const LoginModal = memo((props: PropsWithChildren<LoginModalProps>) => {
	const { className, isOpen, onClose } = props;
	const { t } = useTranslation();

	return (
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={
				<DeprecatedModal
					isOpen={isOpen}
					onClose={onClose}
					className={classNames('', {}, [className])}
					width={400}
					title={t('formAuth')}
				>
					<Suspense fallback={<CircleLoader />}>
						<LoginFormAsync onSuccess={onClose} />
					</Suspense>
				</DeprecatedModal>
			}
			on={
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
			}
		/>
	);
});
