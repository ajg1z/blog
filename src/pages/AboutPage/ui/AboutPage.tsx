import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/deprecated/Text';
import { PageWrapper } from '@/widgets/PageWrapper';

const AboutPage = memo(() => {
	const { t } = useTranslation('about');

	return (
		<div>
			<PageWrapper data-testid='AboutPage'>
				<Text title={t('title')} size='L' />
			</PageWrapper>
		</div>
	);
});

export default AboutPage;
