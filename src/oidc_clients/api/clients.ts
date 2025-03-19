import { get, getAllPages } from 'common/utils/api';
import { deleteR } from '../../common/utils/api';
import { IOidcClient } from '../models/client';
import { IResponseType } from '../models/responsetype';
import { getUser } from 'authentication/api';
const API_BASE = '/api/v1/oidc/';

// api for geting oidc client information and for creating new oidc clients
type ClientResponseType = { response_types: number[] } & Omit<IOidcClient, 'response_types'>;

// fetches specific client
export const getClient = async (id: number): Promise<IOidcClient> => {
  try {
    const client = await get<ClientResponseType>(API_BASE + 'clients/' + id + '/');
    const responseTypes = await getResponseTypes();
    const newResponseTypes = client.response_types.flatMap((response_type) => {
      const responseType = responseTypes.get(response_type);
      return responseType ? [responseType] : [];
    });

    const newClient: IOidcClient = { ...client, response_types: newResponseTypes };
    return newClient;
  } catch (response) {
    throw new Error(`Kunne ikke hente klient: ${response.statusText}`);
  }
};

// fetches all clients
export const getAllClients = async (): Promise<IOidcClient[]> => {
  try {
    const clients = await getAllPages<ClientResponseType>(API_BASE + 'clients/');
    const responseTypes = await getResponseTypes();
    const newClients: IOidcClient[] = [];

    for (const client of clients) {
      const newResponseTypes = client.response_types.flatMap((response_type) => {
        const responseType = responseTypes.get(response_type);
        return responseType ? [responseType] : [];
      });

      const newClient: IOidcClient = { ...client, response_types: newResponseTypes };
      newClients.push(newClient);
    }

    return newClients;
  } catch (response) {
    throw new Error(`Kunne ikke hente apper: ${response.statusText}`);
  }
};

export const getResponseTypes = async (): Promise<Map<number, IResponseType>> => {
  const responseTypes = await getAllPages<IResponseType>(API_BASE + 'response-types/');
  const responseTypeMap: Map<number, IResponseType> = new Map();

  for (const responseType of responseTypes) {
    responseTypeMap.set(responseType.id, responseType);
  }

  return responseTypeMap;
};

// fetch clients owned by me
export const getMyClients = async (): Promise<IOidcClient[]> => {
  const user = await getUser();
  const clients = await getAllClients();
  const filtered = clients.filter((client) => {
    return client.owner && client.owner.username === user?.profile.preferred_username;
  });
  return filtered;
};

export const deleteClient = async (id: number): Promise<unknown> => {
  try {
    const user = await getUser();
    return await deleteR(`${API_BASE}clients/${id}`, undefined, undefined, { user });
  } catch (response) {
    throw new Error(`Kunne ikke slette app: ${response.statusText}`);
  }
};
