import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from 'widgets/PageWrapper';

const AboutPage = memo(() => {
    const { t } = useTranslation('about');

    return (
        <div>
            <PageWrapper>{t('title')}</PageWrapper>
        </div>
    );
});

export default AboutPage;
