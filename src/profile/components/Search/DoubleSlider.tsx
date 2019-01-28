import React, { Component } from 'react';
import style from './search.less';

export interface IProps {
  range: [number, number];
  onChange: (range: [number, number]) => void;
}

export interface IState {
  range: [number, number];
}

class DoubleSlider extends Component<IProps, IState> {
  public state: IState = {
    range: [1, 6],
  };

  public submit() {
    this.props.onChange(this.state.range);
  }

  public setRange1(n: number) {
    const { range } = this.state;
    if (range[1] >= n) {
      range[0] = n;
    }
    this.setState({ range }, this.submit);
  }

  public setRange2(n: number) {
    const { range } = this.state;
    if (range[0] <= n) {
      range[1] = n;
    }
    this.setState({ range }, this.submit);
  }

  public render() {
    const {
      range: [start, end],
    } = this.state;
    return (
      <div className={style.slider}>
        <h4>
          {this.state.range[0]} - {this.state.range[1]}
        </h4>
        <input
          // value={range.toString()}
          defaultValue={start.toString()}
          min="1"
          max="6"
          step="1"
          type="range"
          onChange={(e) => this.setRange1(parseInt(e.target.value, 10))}
        />
        <input
          // value={range.toString()}
          defaultValue={end.toString()}
          min="1"
          max="6"
          step="1"
          type="range"
          onChange={(e) => this.setRange2(parseInt(e.target.value, 10))}
        />
      </div>
    );
  }
}

export default DoubleSlider;
