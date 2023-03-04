import { useTranslation } from 'react-i18next';

import { memo, PropsWithChildren } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamycModuleLoader/DynamicModuleLoader';
import { ProfileCard, profileReducer } from 'entities/Profile';

interface ProfilePageProps {}

const initialReducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = memo((props: PropsWithChildren<ProfilePageProps>) => {
    const { t } = useTranslation('profile');

    return (
        <DynamicModuleLoader reducers={initialReducers} isRemoveAfterUnmount>
            <ProfileCard />
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
