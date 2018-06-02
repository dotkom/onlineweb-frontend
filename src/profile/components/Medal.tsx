import React from 'react';

const MEDAL_BASE_URL = '/static/img/profile/'

const COMMITTEES = {
  'arrkom': 'arrkom',
  'bedkom': '',
  'dotkom': '',
  'fagkom': '',
  'hovedstyret': '',
  'prokom': '',
  'seniorkom': '',
  'trikom': '',
}

const CROWNS = {
  leder: 'king-crown',
  nestleder: 'prince-crown',
  redaktør: 'offline-hat',
  medlem: 'king-crown',
  økonomiansvarlig: 'bankom-hat-gold'
}

class Medal extends React.Component {
  render() {
    const { committee, position, range } = this.props;
    return (
      <div className="medal-container">
        <div className="committee-crown-container">
          { position === 'medlem' ?
            undefined :
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
