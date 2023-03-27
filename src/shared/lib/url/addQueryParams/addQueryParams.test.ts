import { getQueryParams } from './addQueryParams';

describe('addQueryParams', () => {
    test('test with one params', () => {
        expect(getQueryParams({ test: 'test' })).toBe('test=test');
    });

    test('test with many params', () => {
        expect(getQueryParams({ test: 'test', q: 'text', sort: 'date', order: '' })).toBe(
            'test=test&q=text&sort=date',
        );
    });

    test('test with undefined params', () => {
        expect(getQueryParams({ test: undefined, q: undefined })).toBe('');
    });
});
