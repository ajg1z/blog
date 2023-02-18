import { fireEvent, render, screen } from '@testing-library/react';
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    beforeEach(() => {
        renderWithTranslation(<Sidebar />);
    });
    test('render', () => {
        expect(screen.getByTestId('toggle-btn')).toBeInTheDocument();
        expect(screen.getByTestId('toggle-btn')).toHaveClass('primary');
        screen.debug();
    });

    test('toggle', () => {
        fireEvent.click(screen.getByTestId('toggle-btn'));
        expect(screen.getByLabelText('sidebar')).toHaveClass('collapsed');
        fireEvent.click(screen.getByTestId('toggle-btn'));
        expect(screen.getByLabelText('sidebar')).not.toHaveClass('collapsed');
        screen.debug();
    });
});
