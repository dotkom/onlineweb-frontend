import { DateTime } from 'luxon';
import React, { useContext } from 'react';

import { Content, Pane } from 'common/components/Panes';
import { UserProfileContext } from 'profile/providers/UserProfile';

import KeyValue from '../KeyValue';
import Progress from './Progress';
import style from './study.less';

export const Study = () => {
  const { user } = useContext(UserProfileContext);
  if (!user) {
    return null;
  }
  const startYear = DateTime.fromISO(user.started_date).toFormat('y');
  return (
    <Pane>
      <Content title="Studie">
        <div className={style.studyText}>
          <KeyValue k="Klassetrinn" v={`${user.year}. Klasse`} />
          <KeyValue k="Startår" v={startYear} />
        </div>
        <Progress ongoingYear={user.year} completedYear={user.year - 1} />
      </Content>
    </Pane>
  );
};
