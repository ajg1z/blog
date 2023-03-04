import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import i18nForTests from '../../../config/i18n/i18nForTests';

interface renderWithRouterOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
}

// eslint-disable-next-line arrow-body-style
export const componentRender = (component: ReactNode, options: renderWithRouterOptions = {}) => {
    const { route = '/', initialState } = options;

    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState}>
                <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
            </StoreProvider>
            ,
        </MemoryRouter>,
    );
};
