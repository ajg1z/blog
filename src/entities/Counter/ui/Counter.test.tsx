import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Counter', () => {
    beforeEach(() => {
        componentRender(<Counter />, {
            initialState: {
                counter: {
                    value: 10,
                },
            },
        });
    });

    test('render', () => {
        expect(screen.getByTestId('count')).toHaveTextContent('10');
        screen.debug();
    });

    test('decrement', () => {
        fireEvent.click(screen.getByTestId('decrement'));
        expect(screen.getByTestId('count')).toHaveTextContent('9');
    });

    test('increment', () => {
        fireEvent.click(screen.getByTestId('increment'));
        expect(screen.getByTestId('count')).toHaveTextContent('11');
    });
});
