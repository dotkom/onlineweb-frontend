import React from 'react';
import Medal from './Medal';
import { IMedal } from '../../models/Medal';
import style from '../../less/profile.less';

export interface IProps {
  medals: IMedal[];
  name: string;
}

export interface IState {
  slice: number;
  showAmount: number;
}

class Name extends React.Component<IProps, IState> {
  public state: IState = { slice: 3, showAmount: 3 };

  public slide(num: number) {
    const { medals } = this.props;
    const { slice, showAmount } = this.state;
    let adjusted = slice + num;
    if (adjusted > medals.length) {
      adjusted = slice;
    } else if (adjusted - showAmount < 0) {
      adjusted = showAmount;
    }
    this.setState({ slice: adjusted });
  }

  public render() {
    const { slice, showAmount } = this.state;
    const { medals, name } = this.props;
    return (
      <div className={style.infoGroup}>
        {/*<img className="profile-group-icon" src={`${STATIC_URL + icon}.svg`} />*/}
        <h1>{name}</h1>
        <div className={style.medalGrid}>
          {medals.slice(slice - showAmount, slice).map(medal => (
            <Medal key={medal.committee + medal.position + medal.range} {...medal} />
          ))}
        </div>
      </div>
    );
  }
}

export default Name;
