import { ComponentStory, ComponentMeta } from '@storybook/react';
import AdminPanelPage from './AdminPanelPage';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

export default {
    title: 'pages/AdminPanelPage',
    component: AdminPanelPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AdminPanelPage>;

const Template: ComponentStory<typeof AdminPanelPage> = (args) => <AdminPanelPage />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
    StoreDecorator({
        scrollRecovery: {
            403: 0,
        },
    }),
];
