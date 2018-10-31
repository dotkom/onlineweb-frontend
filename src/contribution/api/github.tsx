import { toQueryString } from '../../common/utils/queryString';

const GIT_API_DOMAIN = 'https://api.github.com';

/* Temporary get method to access git domain */
const get = async (query: string, parameters: object = {}, options?: RequestInit): Promise<any> => {
    const queryString = toQueryString(parameters);
    try {
        const response = await fetch(GIT_API_DOMAIN + query + queryString, options);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        // Add handle error for some reason?
    }
};

export const getRepositories = async () => {
  try {
    const data = await get('/orgs/dotkom/repos', { format: 'json' });
    return data;
  } catch (err) {
    console.error(err);
  }
};
