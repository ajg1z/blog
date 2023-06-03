import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useCallback, useEffect, useState } from 'react';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/deprecated/Button';
import { VStack } from '@/shared/ui/designV2/Stack';

interface ProfilePageGreetingProps {}

export const ProfilePageGreeting = memo((props: PropsWithChildren<ProfilePageGreetingProps>) => {
	const { t } = useTranslation('profile');
	const { t: commonT } = useTranslation();
	const { profilePageHasBeenOpen } = useJsonSettings();

	const dispatch = useAppDispatch();

	const [isOpen, setIsOpen] = useState(false);

	const onClose = useCallback(async () => {
		setIsOpen(false);
	}, []);

	const setFirstVisited = async () => {
		await dispatch(
			saveJsonSettings({
				profilePageHasBeenOpen: true,
			}),
		);
	};

	useEffect(() => {
		if (profilePageHasBeenOpen === false) {
			setIsOpen(true);
			setFirstVisited();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Modal width={400} isOpen={isOpen} onClose={onClose}>
			<VStack gap={8} align='center'>
				<Text align='center' title={t('greetingTitle')} />
				<Button onClick={onClose}>{commonT('button.close')}</Button>
			</VStack>
		</Modal>
	);
});
