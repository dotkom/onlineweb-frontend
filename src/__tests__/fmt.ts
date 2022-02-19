import fmt from 'profile/utils/stringFormat';

const DEFAULT = 'Ikke tilgjengelig';
test('empty string', () => expect(fmt('')).toBe(''));
test('empty string', () => expect(fmt('{0}', 0)).toBe('0'));
test('empty string', () => expect(fmt('{0} {1}', 'Henrik', 'Skog')).toBe('Henrik Skog'));
test('hello', () => expect(fmt('{1} {0}', 'Henrik', 123)).toBe('123 Henrik'));
test('hello', () => expect(fmt('{0} {1}', 'Henrik', undefined)).toBe(DEFAULT));
test('hello', () => expect(fmt('{0} {1}', 'Henrik', null)).toBe(DEFAULT));
