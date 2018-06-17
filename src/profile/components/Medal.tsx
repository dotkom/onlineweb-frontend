import React from 'react';
import { STATIC_URL } from 'common/constants/endpoints';
import { MedalUrl } from '../models/ImageTypes';
import { IMedal } from '../models/Medal';

const MEDAL_BASE_URL = STATIC_URL + 'img/profile/';

const CROWNS: MedalUrl = {
  leder: 'king-crown',
  nestleder: 'prince-crown',
  redaktør: 'offline-hat',
  medlem: 'king-crown',
  økonomiansvarlig: 'bankom-hat-gold'
}

class Medal extends React.Component<IMedal> {
  render() {
    const { committee, position, range } = this.props;
    return (
      <div className="medal-container">
        <div className="committee-crown-container">
          { position === 'medlem' ?
            null :
            <img
              className="committee-crown"
              src={`${MEDAL_BASE_URL + CROWNS[position]}.svg`}
              title={position}
            />
          }
        </div>
        <img
          className="committee-medal"
          src={`${MEDAL_BASE_URL + committee}-medal.svg`}
          title={committee}
        />
        <p className="committee-range">{ range }</p>
      </div>
    );
  }
}

export default Medal;
