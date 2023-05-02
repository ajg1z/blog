import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import avarar from '@/shared/assets/tests/image/avatar.jpg';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { EditableProfileCard } from './EditableProfileCard';

export default {
    title: 'features/EditableProfileCard',
    component: EditableProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (arg) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <EditableProfileCard {...arg} />
);

const data = {
    username: 'Demion',
    age: 20,
    city: 'Ufa',
    country: Country.Russia,
    currency: Currency.RUB,
    firstname: 'Ajgiz',
    lastname: 'Usmanov',
    avatar: avarar,
};

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
    StoreDecorator({
        profile: {
            form: data,
            data,
            isLoading: false,
            readonly: true,
        },
    }),
];
