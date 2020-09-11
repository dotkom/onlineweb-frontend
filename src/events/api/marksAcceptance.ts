import { DateTime } from 'luxon';
import { getUser } from 'authentication/api';
import { get, IAPIData } from 'common/utils/api';

const MARK_ACCEPTANCE_URL = `/api/v1/marks/acceptance`;

interface IMarkAcceptance {
  rule_set: string;
  accepted_date: DateTime;
}

export const getMarksAcceptance = async (): Promise<IMarkAcceptance[]> => {
  const user = await getUser();
  const markAcceptance = await get<IAPIData<IMarkAcceptance>>(MARK_ACCEPTANCE_URL, { format: 'json' }, { user });
  return markAcceptance.results;
};
