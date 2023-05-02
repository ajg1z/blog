import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    beforeEach(() => {
        componentRender(<Sidebar />);
    });
    test('render', () => {
        expect(screen.getByTestId('toggle-btn')).toBeInTheDocument();
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
