import { Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import 'app/styles/index.scss';
import { Suspense } from 'react';

export const SuspenseDecorator = (theme: Theme) => (StoryComponent: Story) =>
    (
        <Suspense fallback=''>
            <StoryComponent />
        </Suspense>
    );
