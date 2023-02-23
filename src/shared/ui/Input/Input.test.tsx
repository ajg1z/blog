import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
    test('render', () => {
        // eslint-disable-next-line i18next/no-literal-string
        render(<Input placeholder='input' />);
        expect(screen.getByPlaceholderText(/input/i)).toBeInTheDocument();
        screen.debug();
    });
});
