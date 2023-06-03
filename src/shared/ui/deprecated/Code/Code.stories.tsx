import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Code } from './Code';

export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        src: `https://encrypted-tbn0.gstatic.com/images?q=tbn:
        ANd9GcSb6Z6Uxl-jW0hktZrPM6uOwPnm8h01l8Bk3w&usqp=CAU`,
    },
} as ComponentMeta<typeof Code>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Default = Template.bind({});
Default.args = {
    text: `import { ComponentStory, ComponentMeta } from '@storybook/react';

    import { Code } from './Code';
    
    export default {
        title: 'shared/Code',
        component: Code,
        argTypes: {
            backgroundColor: { control: 'color' },
        },
        args: {
            src: 'https://encryp&usqp=CAU',
        },
    } as ComponentMeta<typeof Code>;
    
    // eslint-disable-next-line react/jsx-props-no-spreading
    const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;`,
};
