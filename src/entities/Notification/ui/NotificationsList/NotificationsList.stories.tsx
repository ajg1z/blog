import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationsList } from './NotificationsList';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

export default {
    title: 'entities/NotificationsList',
    component: NotificationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof NotificationsList>;

const Template: ComponentStory<typeof NotificationsList> = (arg) => <NotificationsList {...arg} />;

const notification = {
    id: '1',
    title: 'notification title',
    description: 'notification description',
};

export const WithData = Template.bind({});
WithData.args = {};
WithData.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                { ...notification, id: '1' },
                { ...notification, id: '2' },
                { ...notification, id: '3', href: '/' },
                { ...notification, id: '4', href: '/' },
                { ...notification, id: '5' },
                { ...notification, id: '6' },
            ],
        },
    ],
};

export const WithError = Template.bind({});
WithError.args = {};
WithError.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications123`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
};
