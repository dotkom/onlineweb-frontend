import { listResource } from 'common/resources';

import { IRepository } from 'contribution/models/Repository';

export const listRepositories = listResource<IRepository>('/api/v1/repositories');
