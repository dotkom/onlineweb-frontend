import fmt from 'profile/utils/stringFormat';

const DEFAULT = 'Ikke tilgjengelig';
test('Empty string', () => expect(fmt('')).toBe(''));
test('Number', () => expect(fmt('{0}', 0)).toBe('0'));
test('Two string arguments', () => expect(fmt('{0} {1}', 'Henrik', 'Skog')).toBe('Henrik Skog'));
test('String and number argument in reverse order', () => expect(fmt('{1} {0}', 'Henrik', 123)).toBe('123 Henrik'));
test('Undefined argument', () => expect(fmt('{0} {1}', 'Henrik', undefined)).toBe(DEFAULT));
test('Null argument', () => expect(fmt('{0} {1}', 'Henrik', null)).toBe(DEFAULT));
test('Badly formatted formatstring', () => expect(() => fmt('{0} {1', 'Henrik', 'Skog')).toThrow());
