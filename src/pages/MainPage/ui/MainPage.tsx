import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = memo(() => {
    const { t } = useTranslation('main');

    return <div>{t('title')}</div>;
});

export default MainPage;
