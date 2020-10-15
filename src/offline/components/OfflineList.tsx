import React from 'react';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { IOfflineIssue } from 'frontpage/models/Offline';
import { DateTime } from 'luxon';
import style from './style.less';

interface Props {
  offlines?: IOfflineIssue[];
}

const getReleaseYear = (offlineIssue: IOfflineIssue) => DateTime.fromISO(offlineIssue.release_date).year;

const OfflineList: React.FC<Props> = ({ offlines = [] }) => {
  const offlinesPerYear = offlines.reduce((offlineRecord, offlineIssue) => {
    const year = getReleaseYear(offlineIssue);
    Array.isArray(offlineRecord[year])
      ? offlineRecord[year].push(offlineIssue)
      : (offlineRecord[year] = [offlineIssue]);
    return offlineRecord;
  }, {} as Record<number, IOfflineIssue[]>);

  const offlinesAsSections = Object.entries(offlinesPerYear)
    .reverse()
    .map(([year, offlines]) => (
      <section key={year}>
        <h3>{year}</h3>
        {offlines.map((offline) => (
          <a href={offline.issue} className={style.offline} key={offline.release_date}>
            <ResponsiveImage image={offline.image} size="xs" type="offline" />
          </a>
        ))}
      </section>
    ));
  return <>{offlinesAsSections}</>;
};

export default OfflineList;
