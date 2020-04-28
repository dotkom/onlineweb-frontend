type Comparator<T> = (val1: T, val2: T) => boolean;
const DEFAULT_COMPARATOR = <T>(val1: T, val2: T): boolean => val1 === val2;

export const isArrayEqual = <T>(comparator: Comparator<T> = DEFAULT_COMPARATOR) => (prev: T[], next: T[]) => {
  if (prev.length !== next.length) {
    return false;
  }
  return prev.every((value, index) => comparator(value, next[index]));
};
