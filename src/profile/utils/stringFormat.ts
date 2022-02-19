/**
 * Formats a string like the python .format with default fallback
 * @description
 * Format a string with variables and resolves the string to a default value if one of the variables are null/undefined.
 * String cannot include a {
 * @example
 * fmt('Navn: {0} {1}', 'Fornavn', 'Etternavn')) => 'Navn: Fornavn Etternavn'
 * fmt('Navn: {0} {1}', 'Fornavn', undefined)) => 'Ikke tilgjengelig'
 */
const fmt = (frmtStr: string, ...args: (string | number | undefined | null)[]): string => {
  if (args.filter((el) => el == null).length) return 'Ikke tilgjengelig';

  let res = '';
  let strIdx = 0;
  while (strIdx < frmtStr.length) {
    if (frmtStr[strIdx] == '{') {
      // Concatting a number to a string returns string in js
      res += args[Number(frmtStr[strIdx + 1])];
      strIdx += 3;
    } else {
      res += frmtStr[strIdx];
      strIdx++;
    }
  }
  return res;
};

export default fmt;
