import React from 'react';
import { STATIC_URL } from 'common/constants/endpoints';
import style from '../../less/profile.less';

const PROFILE_STATIC = STATIC_URL + 'common/img/profile/';

export interface Props {
  name: string;
  icon: string;
}

class InfoGroup extends React.Component<Props> {
  render() {
    const { children, name, icon } = this.props;
    return (
      <div className={style.infoGroup}>
        { /*<img className="profile-group-icon" src={`${STATIC_URL + icon}.svg`} />*/ }
        <p className={style.name}>{ name }</p>
        <div className={style.groupWrapper}>
          { children }
        </div>
      </div>
    );
  }
}

export default InfoGroup;
