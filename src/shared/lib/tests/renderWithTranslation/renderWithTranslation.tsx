import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { ReactNode, Suspense } from 'react';
import i18nForTests from '../../../config/i18n/i18nForTests';

export const renderWithTranslation = (component: ReactNode) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    render(
        <Suspense fallback=''>
            <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
        </Suspense>,
    );
