import { Suspense } from 'react';
import { Story } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';

export const SuspenseDecorator = (theme: Theme) => (StoryComponent: Story) =>
    (
        <Suspense fallback=''>
            <StoryComponent />
        </Suspense>
    );
