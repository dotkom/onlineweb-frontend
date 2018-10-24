
/**
 * @summary Dirty hack.
 * @description We need the key to be typed as a (keyof T).
 * Object.keys(object: T) will always return a 'string[]', not (keyof T)[].
 * With this function we redefine the type of array that Object.keys returns.
 */
export function getKeys<T>(object: T): Array<keyof T> {
  return Object.keys(object) as Array<keyof T>;
}
