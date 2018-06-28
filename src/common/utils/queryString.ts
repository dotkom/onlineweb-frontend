
/**
 * TODO: Add validation
 * @param {object} queryObject e.g. {foo: 'bar', hello: 'world'}
 * @return {string} e.g. ?foo=bar&hello=world
 */
export const toQueryString = (queryObject: any): string => {
  const keys = Object.keys(queryObject);
  if (keys.length <= 0) {
    return '';
  }
  const queries = keys.map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`);
  const string = `?${queries.join('&')}`;
  //console.log(`[queryString] object: ${JSON.stringify(queryObject)}, string: ${string}`)
  return string;
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
  let queryObject = queryString.split('&')
    .map((query: string) => {
      const pair = query.split('=').map(a => decodeURIComponent(a));
      return {[pair[0]]: pair[1]};
    })
    .reduce((accumulator, query) => {
      Object.assign(accumulator, query);
      return accumulator;
    }, );
  
  return queryObject;
};
