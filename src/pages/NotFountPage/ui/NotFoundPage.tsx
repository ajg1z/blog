import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/deprecated/Text';
import { PageWrapper } from '@/widgets/PageWrapper';

export const NotFoundPage = memo(() => {
	const { t } = useTranslation();
	return (
		<PageWrapper data-testid='NotFoundPage'>
			<Text title={t('notFoundPage')} />
		</PageWrapper>
	);
});
