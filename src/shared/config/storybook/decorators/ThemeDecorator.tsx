// eslint-disable-next-line fsd-react/layer-imports
import '@/app/styles/index.scss';
import { Story } from '@storybook/react';
import { Theme } from '@/shared/const/theme';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
    (
        <div className={`app ${theme}`}>
            <StoryComponent />
        </div>
    );
