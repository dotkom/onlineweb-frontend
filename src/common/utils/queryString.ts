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
  const queries = keys
    .filter((key) => queryObject[key] !== undefined)
    .map((key: string) => `${key}=${queryObject[key]}`);
  return `?${queries.join('&')}`;
};

export interface IQueryObject {
  [index: string]: string;
}

/**
 * TODO: Add validation
 * @param {string} queryString e.g. ?foo=bar&hello=world
 * @return {object} e.g. {foo: 'bar', hello: 'world'}
 */
export const toQueryObject = (queryString: string): IQueryObject => {
  if (queryString.startsWith('?')) {
    queryString = queryString.substring(1);
  }
  /*let queryObject: IQueryObject = {}
  for (const query of queryString.split('&')) {
    const pair = query.split('=');
    queryObject[pair[0]] = pair[1];
  }*/
  const queryObject = queryString
    .split('&')
    .map((query: string) => {
      const pair = query.split('=');
      return { [pair[0]]: pair[1] };
    })
    .reduce((accumulator, query) => {
      accumulator[query.key] = query[query.key];
      return accumulator;
    });

  return queryObject;
};
