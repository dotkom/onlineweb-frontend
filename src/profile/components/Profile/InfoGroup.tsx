import React from 'react';
import { STATIC_URL } from 'common/constants/endpoints';

const PROFILE_STATIC = STATIC_URL + 'img/profile/';

export interface Props {
  name: string;
  icon: string;
}

class InfoGroup extends React.Component<Props> {
  render() {
    const { children, name, icon } = this.props;
    return (
      <div className="profile-info-group">
        { /*<img className="profile-group-icon" src={`${STATIC_URL + icon}.svg`} />*/ }
        <p className="profile-group-name">{ name }</p>
        <div className="profile-group-wrapper">
          { children }
        </div>
      </div>
    );
  }
}

export default InfoGroup;
