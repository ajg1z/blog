import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    test('render', () => {
        // eslint-disable-next-line
        render(<Button>Test</Button>);
        expect(screen.getByText(/test/i)).toBeInTheDocument();
        screen.debug();
    });
});
