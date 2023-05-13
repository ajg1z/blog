import { Story } from '@storybook/react';

export const ContainerDecorator = (StoryComponent: Story) => (
    <div style={{ overflowY: 'scroll', height: '100vh', padding: '10px' }}>
        <StoryComponent />
    </div>
);
