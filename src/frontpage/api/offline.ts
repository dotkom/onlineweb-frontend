import { IOfflineIssue } from 'frontpage/models/Offline';

const API_URL =
  'https://wsqi2mae.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D%22offline%22%5D%20%7C%20order(release_date%20desc)%20%7B%0A%20%20_id%2C%0A%20%20title%2C%0A%20%20release_date%2C%0A%20%20%22issue%22%3A%20pdf.asset%20-%3E%20url%2C%0A%20%20%22image%22%3A%20thumbnail.asset%20-%3E%20%7B%0A%20%20%20%20url%2C%0A%20%20%20%20title%0A%20%20%7D%0A%7D';

export const getAllOfflines = async (): Promise<IOfflineIssue[]> => {
  try {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data.result as IOfflineIssue[];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
