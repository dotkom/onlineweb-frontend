import { DateTime } from 'luxon';
import { FC } from 'react';
import { ICommitteeUpdate } from 'committeeupdates/models/CommitteeUpdate';
import Markdown from 'common/components/Markdown';
import style from './committee.less';

interface StatusUpdateProps {
  data: ICommitteeUpdate;
}

export const StatusUpdate: FC<StatusUpdateProps> = ({ data }) => {
  return (
    <li className={style.updateContainer}>
      <div className={style.updateHeader}>
        {data.group.image?.thumb ? (
          <img src={data.group.image?.thumb} alt="Thumbnail" />
        ) : (
          <div className={style.noThumbnail}></div>
        )}
        <span>{data.group.name_short}</span>
        &#x2022;
        <span>{DateTime.fromISO(data.created_at).toFormat('d. MMM HH:mm')}</span>
      </div>
      <div className={style.updateContentContainer}>
        {/* <pre>{data.content}</pre> */}
        <Markdown source={data.content} />
      </div>
      {/* <div className={style.updateFooter}>
        <span>{DateTime.fromISO(data.created_at).toFormat('d. MMM HH:mm')}</span>
      </div> */}
    </li>
  );
};
