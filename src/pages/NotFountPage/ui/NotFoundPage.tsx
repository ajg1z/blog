import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from 'widgets/PageWrapper';
import { HStack } from 'shared/ui/Stack';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage = memo(() => {
    const { t } = useTranslation();
    return (
        <HStack justify='center' className={cls.NotFoundPage}>
            <PageWrapper>{t('not_found_page')}</PageWrapper>
        </HStack>
    );
});
