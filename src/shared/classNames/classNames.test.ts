import { classNames } from './classNames';

describe('classNames', () => {
    test('main class', () => {
        expect(classNames('class')).toBe('class');
    });

    test('additional classes', () => {
        expect(classNames('class', {}, ['class2', 'class3'])).toBe('class class2 class3');
    });

    test('additional classes(check undefined)', () => {
        expect(classNames('class', {}, ['class2', undefined])).toBe('class class2');
    });

    test('mods', () => {
        expect(classNames('class', { select: true, isIgnore: true })).toBe('class select isIgnore');
    });

    test('mods check false', () => {
        expect(classNames('class', { select: false, isIgnore: true })).toBe('class isIgnore');
    });

    test('mods check undefined', () => {
        expect(classNames('class', { select: false, isIgnore: undefined })).toBe('class');
    });
});
