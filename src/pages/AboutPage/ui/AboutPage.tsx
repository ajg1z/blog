import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ui/ListBox';
import { Text } from 'shared/ui/Text';
import { PageWrapper } from 'widgets/PageWrapper';

const AboutPage = memo(() => {
    const { t } = useTranslation('about');

    return (
        <div>
            <PageWrapper>
                <Text title={t('title')} size='L' />
            </PageWrapper>
        </div>
    );
});

export default AboutPage;
