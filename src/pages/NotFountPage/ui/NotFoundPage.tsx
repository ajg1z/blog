import { useTranslation } from 'react-i18next';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
    const { t } = useTranslation();
    return <div className={cls.NotFoundPage}>{t('not_found_page')}</div>;
};
