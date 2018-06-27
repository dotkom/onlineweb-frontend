import React from 'react';
import Medal from './Medal';
import { IMedal } from '../../models/Medal';

export interface Props {
  medals: IMedal[];
  name: string;
}

export interface State {
  slice: number;
  showAmount: number;
}

class Name extends React.Component<Props, State> {
  state: State = { slice: 3, showAmount: 3 }

  slide(number: number) {
    const { medals } = this.props;
    const { slice, showAmount } = this.state;
    let adjusted = slice + number;
    if (adjusted > medals.length) {
      adjusted = slice;
    } else if (adjusted - showAmount < 0) {
      adjusted = showAmount;
    }
    this.setState({ slice: adjusted })
  }

  render() {
    const { slice, showAmount } = this.state;
    const { medals, name } = this.props;
    return (
      <div className="profile-info-group">
        { /*<img className="profile-group-icon" src={`${STATIC_URL + icon}.svg`} />*/ }
        <p className="profile-group-name">{ name }</p>
        <div className="profile-medal-grid">
          { medals.slice(slice - showAmount, slice).map(medal => 
            <Medal
              key={medal.committee + medal.position + medal.range}
              {...medal}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Name;
