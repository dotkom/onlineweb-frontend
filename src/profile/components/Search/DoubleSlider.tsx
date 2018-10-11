import React, { Component } from 'react';

export interface IProps {
  range: [number, number];
  onChange: (range: [number, number]) => boolean;
}

export interface IState {
  range: [number, number];
}

class DoubleSlider extends Component<IProps, IState> {
  state: IState = {
    range: [1, 6]
  }

  submit() {
    console.log(this.state.range)
    this.props.onChange(this.state.range);
  }

  setRange1(n: number) {
    let { range } = this.state;
    range[0] = n;
    this.setState({ range }, this.submit)
  }

  setRange2(n: number) {
    let { range } = this.state;
    range[1] = n;
    this.setState({ range }, this.submit)
  }

  public render() {
    const { onChange } = this.props;
    const { range: [ start, end ] } = this.state;
    return (
      <div>
        <input
          //value={range.toString()}
          defaultValue={start.toString()}
          min="1"
          max="6"
          step="1"
          type="range"
          onChange={(e) => this.setRange1(parseInt(e.target.value))}
        />
        <input
          //value={range.toString()}
          defaultValue={end.toString()}
          min="1"
          max="6"
          step="1"
          type="range"
          onChange={(e) => this.setRange2(parseInt(e.target.value))}
        />
      </div>
    )
  }
}

export default DoubleSlider;
