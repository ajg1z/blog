import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo } from 'react';
import { VStack } from '@/shared/ui/designV2/Stack';
import { ScrollToTopButton } from '@/features/ScrollToTopButton';

interface ScrollToolbarProps {
	className?: string;
}

export const ScrollToolbar = memo((props: PropsWithChildren<ScrollToolbarProps>) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<VStack justify='center' align='center' className={className}>
			<ScrollToTopButton />
		</VStack>
	);
});
