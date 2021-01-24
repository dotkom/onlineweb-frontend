/** Base URL for the profile API */
const API_URL = 'https://fraktguide.bring.no/fraktguide/api/postalCode.json?country=no&pnr=';

interface IPublicPostal {
  result: string;
  valid: boolean;
  postalCodeType: string;
}
/**
 * Function that retrieves city name based on ZIP-code
 */
export const getCity = async (zip_code: string | null): Promise<IPublicPostal> => {
  return await fetch(API_URL + zip_code).then((data) => data.json());
};
