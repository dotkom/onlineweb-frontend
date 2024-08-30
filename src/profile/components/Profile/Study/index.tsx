import { DateTime } from 'luxon';
import React, { useContext } from 'react';

import { Content, Pane } from 'common/components/Panes';
import { ProfilePageContext } from 'profile/providers/ProfilePage';

import KeyValue from '../KeyValue';
import Progress from './Progress';
import style from './study.less';
import { memberDisplay } from 'profile/components/Settings/SettingsInfo';

export const Study = () => {
  const profile = useContext(ProfilePageContext);
  const { started_date, year } = profile;
  const startYear = DateTime.fromISO(started_date).toFormat('y');
  return (
    <Pane>
      <Content title="Studie">
        <div className={style.studyText}>
          <KeyValue k="Klassetrinn" v={memberDisplay(profile)} />
          <KeyValue k="Startår" v={startYear} />
        </div>
        <Progress ongoingYear={year} completedYear={year - 1} />
      </Content>
    </Pane>
  );
};
