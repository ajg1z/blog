import { memo, PropsWithChildren } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { EditableProfileCard, profileReducer } from 'features/EditableProfileCard';

interface ProfilePageProps {}

const initialReducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = memo(() => (
    <DynamicModuleLoader reducers={initialReducers}>
        <EditableProfileCard />
    </DynamicModuleLoader>
));

export default ProfilePage;
