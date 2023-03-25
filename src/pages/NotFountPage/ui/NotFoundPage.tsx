import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from 'widgets/PageWrapper';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage = memo(() => {
    const { t } = useTranslation();
    return (
        <div className={cls.NotFoundPage}>
            <PageWrapper>{t('not_found_page')}</PageWrapper>
        </div>
    );
});
