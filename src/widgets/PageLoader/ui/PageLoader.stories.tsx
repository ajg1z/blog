import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PageLoader } from './PageLoader';

export default {
    title: 'widgets/PageLoader',
    component: PageLoader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PageLoader>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof PageLoader> = (args) => <PageLoader {...args} />;

export const Default = Template.bind({});
Default.args = {};
