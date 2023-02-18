import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from '../../../config/i18n/i18nForTests';

interface renderWithRouterOptions {
    route?: string;
}

// eslint-disable-next-line arrow-body-style
export const componentRender = (component: ReactNode, options: renderWithRouterOptions = {}) => {
    const { route = '/' } = options;

    return render(
        <MemoryRouter initialEntries={[route]}>
            <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
        </MemoryRouter>,
    );
};
