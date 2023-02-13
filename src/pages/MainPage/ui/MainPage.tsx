import { useTranslation } from 'react-i18next';

function MainPage() {
    const { t } = useTranslation('main');

    return <div>{t('title')}</div>;
}

export default MainPage;
