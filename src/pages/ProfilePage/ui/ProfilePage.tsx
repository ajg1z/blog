import { memo } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { EditableProfileCard, profileReducer } from 'features/EditableProfileCard';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import cls from './ProfilePage.module.scss';

const initialReducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = memo(() => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation('profile');
    const user = useSelector(getUserData);

    if (!id) {
        return (
            <div className={cls.noProfile}>
                <Text align='center' title={t('noProfile')} />
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={initialReducers} isRemoveAfterUnmount>
            <EditableProfileCard id={id} isEditable={+id === user?.id} />
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
