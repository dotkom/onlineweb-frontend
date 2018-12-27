import React from 'react';

import OfficeSchedule from './components/OfficeSchedule';
import style from './components/style.less';
import OfficeCalendarProvider from './providers/OfficeCalendar';

const Office = () => {
  return (
    <section className={style.section}>
      <OfficeCalendarProvider>
        <OfficeSchedule />
      </OfficeCalendarProvider>
    </section>
  );
};

export default Office;
