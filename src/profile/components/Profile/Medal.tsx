import React from 'react';
import style from '../../less/profile.less';
import { IMedal } from '../../models/Medal';
import Crown from './Crown';
import MedalIcon from './MedalIcon';

class Medal extends React.Component<IMedal> {
  public render() {
    const { committee, position, period } = this.props;
    return (
      <div className={style.medalContainer}>
        <div className={style.committeeCrownContainer}>
          <Crown position={position} />
        </div>
        <MedalIcon committee={committee} />
        <p className={style.committeeRange}>{period}</p>
      </div>
    );
  }
}

export default Medal;
