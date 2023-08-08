import ResponsiveImage from 'common/components/ResponsiveImage';
import { getOnlineGroups } from 'groups/api';
import { IOnlineGroup } from 'groups/models/onlinegroup';
import React, { useEffect, useState } from 'react';

import style from '../../applications/committee.less';

const Committees: React.FC = () => {
  const [committees, setCommittees] = useState<IOnlineGroup[]>([]);
  const applicationFormUrl = 'https://forms.gle/m9ya7JPxjiJHE9NG9' // updated for August 2023

  useEffect(() => {
    console.log('Running');
    getOnlineGroups().then((groups: IOnlineGroup[]) => {
      const CommitteeList: IOnlineGroup[] = [];
      for (let i = 0; i < groups.length; i++) {
        if (
          (groups[i].group_type == 'committee' &&
            !['Hovedstyret', 'Komitéledere', 'Onlines Fond', 'Pangsjonistkomiteen'].includes(groups[i].name_long)) ||
          groups[i].name_short == 'Appkom'
        ) {
          CommitteeList.push(groups[i]);
        }
      }
      setCommittees(CommitteeList);
    });
  }, []);
  return (
    <div className={style.container}>
      <div className={style.bigBoldLetters}>Velkommen til Onlines komiteer!</div>
      <div className={style.intro}>
        Komitémedlemmene våre får Online til å gå rundt, og arbeider for at alle informatikkstudenter skal ha en flott
        studiehverdag.
        <br /> <a href={applicationFormUrl}>Her</a> kan du søke om å bli en av oss!
      </div>
      {committees.map((com) => {
        return (
          <div key={com.name_short} className={style.hobbyCard}>
            <div className={style.imageContainer}>{com.image ? <ResponsiveImage image={com.image} /> : null}</div>
            <div className={style.title}>{com.name_long}</div>
            <div>{com.description_long != '' ? com.description_long : com.application_description}</div>
          </div>
        );
      })}
      <div className={style.applyButton}>
        <a className={style.apply} href={applicationFormUrl}>
          Trykk her for å sende inn en søknad!
        </a>
      </div>
    </div>
  );
};

export default Committees;
