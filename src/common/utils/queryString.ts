
/**
 * TODO: Add validation
 * @param {object} queryObject e.g. {foo: 'bar', hello: 'world'}
 * @return {string} e.g. ?foo=bar&hello=world
 */
export const toQueryString = (queryObject: any): string => {
  const keys = Object.keys(queryObject);
  if (!keys.length) {
    return '';
  }
  const queries = keys.map((key: string) => `${key}=${queryObject[key]}`);
  const string = `?${queries.join('&')}`;
  //console.log(`[queryString] object: ${JSON.stringify(queryObject)}, string: ${string}`)
  return string;
};

/**
 * TODO: Add validation
 * @param {string} queryString e.g. ?foo=bar&hello=world
 * @return {object} e.g. {foo: 'bar', hello: 'world'}
 */
export const toQueryObject = (queryString: string): any => {
  if (queryString.startsWith('?')) {
    queryString = queryString.substring(1);
  }
  let queryObject = queryString.split('&').map((query: string) => {
    const pair = query.split('=');
    return {[pair[0]]: pair[1]};
  });
  return {...queryObject};
};
