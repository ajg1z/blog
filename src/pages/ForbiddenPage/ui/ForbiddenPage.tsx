import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '@/widgets/PageWrapper';
import { Text } from '@/shared/ui/Text';

const ForbiddenPage: FC = () => {
    const { t } = useTranslation();

    return (
        <PageWrapper>
            <Text title={t('forbiddenPage')} />
        </PageWrapper>
    );
};

export default ForbiddenPage;
