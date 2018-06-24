import React from 'react';
import { STATIC_URL } from 'common/constants/endpoints';
import { MedalUrl } from '../../models/ImageTypes';
import { IMedal } from '../../models/Medal';
import medals from 'img/profile/medals';
import crowns from 'img/profile/crowns'
class Medal extends React.Component<IMedal> {
  render() {
    const { committee, position, range } = this.props;
    return (
      <div className="medal-container">
        <div className="committee-crown-container">
          { position === 'medlem'
            ? null
            : <img className="committee-crown" src={crowns[position]} title={position} />
          }
        </div>
        <img
          className="committee-medal"
          src={medals[committee]}
          title={committee}
        />
        <p className="committee-range">{ range }</p>
      </div>
    );
  }
}

export default Medal;
