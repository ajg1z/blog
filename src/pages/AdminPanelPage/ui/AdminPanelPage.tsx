import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PageWrapper } from '@/widgets/PageWrapper';
import cls from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage: FC<AdminPanelPageProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation('admin-panel');

    return (
        <PageWrapper>
            <div className={classNames(cls.AdminPanelPage, {}, [className])}>{t('title')}</div>
        </PageWrapper>
    );
};

export default AdminPanelPage;
