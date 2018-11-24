import React from 'react';
import style from '../../less/profile.less';
import { IMedal } from '../../models/Medal';
import Medal from './Medal';

export interface IProps {
  medals: IMedal[];
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
    const { medals } = this.props;
    return (
      <div className={style.medalGrid}>
        {medals.slice(slice - showAmount, slice).map((medal, i) => (
          <Medal key={medal.committee + medal.position + medal.period + i} {...medal} />
        ))}
      </div>
    );
  }
}

export default Name;
