import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avarar from 'shared/assets/tests/image/avatar.jpg';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ProfileCard> = (arg) => <ProfileCard {...arg} />;

export const Default = Template.bind({});
Default.args = {
    data: {
        username: 'Demion',
        age: 20,
        city: 'Ufa',
        country: Country.Russia,
        currency: Currency.RUB,
        firstname: 'Ajgiz',
        lastname: 'Usmanov',
        avatar: avarar,
    },
    isLoading: false,
    readonly: true,
};

export const IsLoading = Template.bind({});
IsLoading.args = {
    isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
    error: 'Error',
};
