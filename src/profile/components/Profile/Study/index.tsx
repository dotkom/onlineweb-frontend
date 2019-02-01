import { DateTime } from 'luxon';
import React, { useContext } from 'react';

import { Content, Pane } from 'common/components/Panes';
import { ProfilePageContext } from 'profile/providers/ProfilePage';

import KeyValue from '../KeyValue';
import Progress from './Progress';
import style from './study.less';

export const Study = () => {
  const { started_date, year } = useContext(ProfilePageContext);
  const startYear = DateTime.fromISO(started_date).toFormat('y');
  return (
    <Pane>
      <Content title="Studie">
        <div className={style.studyText}>
          <KeyValue k="Klassetrinn" v={`${year}. Klasse`} />
          <KeyValue k="Startår" v={startYear} />
        </div>
        <Progress ongoingYear={year} completedYear={year - 1} />
      </Content>
    </Pane>
  );
};
