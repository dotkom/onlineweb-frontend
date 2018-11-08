import crowns from 'common/img/profile/crowns';
import medals from 'common/img/profile/medals';
import React from 'react';
import style from '../../less/profile.less';
import { IMedal } from '../../models/Medal';

class Medal extends React.Component<IMedal> {
  public render() {
    const { committee, position, range } = this.props;
    return (
      <div className={style.medalContainer}>
        <div className={style.committeeCrownContainer}>
          {position === 'medlem' ? null : (
            <img className={style.committeeCrown} src={crowns[position]} title={position} />
          )}
        </div>
        <img className={style.committeeMedal} src={medals[committee]} title={committee} />
        <p className={style.committeeRange}>{range}</p>
      </div>
    );
  }
}

export default Medal;
