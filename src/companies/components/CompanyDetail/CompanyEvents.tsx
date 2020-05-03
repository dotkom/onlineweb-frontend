import { DateTime } from 'luxon';
import React, { useState, FC, useEffect } from 'react';
import { shallowEqual } from 'react-redux';

import Heading from 'common/components/Heading';
import { companySelectors } from 'companies/slices/companies';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { EventList } from 'events/components/ListView/EventList';
import { eventSelectors, fetchEventsForCompany } from 'events/slices/events';

interface IProps {
  companyId: number;
}

export const CompanyEvents: FC<IProps> = ({ companyId }) => {
  const [showPrevious, setShowPrevious] = useState(false);
  const dispatch = useDispatch();
  const companyName = useSelector(selectCompanyName(companyId));
  const eventIds = useSelector(selectEventsIdsForCompanyId(companyId, showPrevious), shallowEqual);
  const isPending = useSelector(selectIsEventsPending());

  useEffect(() => {
    const now = DateTime.local();
    dispatch(fetchEventsForCompany({ companyId, endDate: !showPrevious ? now : undefined }));
  }, [companyId, showPrevious]);

  return (
    <>
      <Heading title="Arrangementer" />
      {eventIds.length === 0 ? (
        isPending ? (
          <p>Laster arrangementer...</p>
        ) : (
          <p>
            {showPrevious
              ? `${companyName} har ingen arrangementer med Online.`
              : `${companyName} har ingen fremtidige arrangementer med Online`}
          </p>
        )
      ) : (
        <EventList eventIds={eventIds} />
      )}
      <button onClick={() => setShowPrevious((current) => !current)}>
        {showPrevious ? `Skjul tidligere arrangementer` : 'Vis tidligere arrangementer'}
      </button>
    </>
  );
};

const selectEventsIdsForCompanyId = (companyId: number, showPrevious: boolean) => (state: State): number[] => {
  const now = DateTime.local();
  return eventSelectors
    .selectAll(state)
    .filter((event) => event.companies.includes(companyId))
    .filter((event) => showPrevious || DateTime.fromISO(event.end_date) >= now)
    .map((event) => event.id);
};

const selectCompanyName = (companyId: number) => (state: State) => {
  return companySelectors.selectById(state, companyId)?.name || '';
};

const selectIsEventsPending = () => (state: State) => {
  return state.events.loading === 'pending';
};
