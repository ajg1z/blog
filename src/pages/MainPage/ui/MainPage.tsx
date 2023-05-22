import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '@/widgets/PageWrapper';

const MainPage = memo(() => {
	const { t } = useTranslation('main');

	return (
		<div>
			<PageWrapper data-testid='MainPage'>{t('title')}123213</PageWrapper>
		</div>
	);
});

export default MainPage;
