import { DateTime } from 'luxon';
import React, { Component } from 'react';

export interface ITrigger {
  method: () => void;
  offset: number;
}

export interface IProps {
  triggers: ITrigger[];
  startOffset: number;
  endTime: DateTime;
}

export interface IState {
  timer: number;
  started: boolean;
  finished: boolean;
}

class CountDown extends Component<IProps, IState> {
  public state: IState = {
    started: false,
    finished: false,
    timer: 0,
  };

  public preCountDownTimeoutHandle?: number;
  public countDownIntervalHandle?: number;
  public triggerTimeoutHandles: number[] = [];

  public componentDidMount() {
    this.initTimeout();
    this.initTriggerTimeouts();
  }

  public componentWillUnmount() {
    this.clearTimeout();
    this.clearInterval();
    this.clearTriggerTimeouts();
  }

  public initTimeout() {
    const { endTime, startOffset } = this.props;
    const endTimeMillis = endTime.toMillis();
    const countDownStart = endTimeMillis - startOffset;
    const now = DateTime.local().toMillis();
    const millisToCountDownStart = countDownStart - now;
    this.preCountDownTimeoutHandle = window.setTimeout(this.initInterval, millisToCountDownStart);
  }

  public clearTimeout() {
    clearTimeout(this.preCountDownTimeoutHandle);
  }

  public initTriggerTimeouts() {
    const { triggers, endTime } = this.props;
    const millisToCountDownEnd = endTime.toMillis() - DateTime.local().toMillis();
    this.triggerTimeoutHandles = triggers.map((trigger) => {
      const offset = millisToCountDownEnd + trigger.offset;
      const timeout = window.setTimeout(trigger.method, offset);
      return timeout;
    });
  }

  public clearTriggerTimeouts() {
    this.triggerTimeoutHandles.forEach((handle) => clearTimeout(handle));
  }

  public initInterval() {
    const { startOffset } = this.props;
    const timer = Math.ceil(startOffset / 1000);
    this.setState({ timer, started: true }, () => {
      this.countDownIntervalHandle = window.setInterval(this.countDownTick, 1000);
    });
  }

  public clearInterval() {
    clearInterval(this.countDownIntervalHandle);
  }

  public countDownTick() {
    const { timer } = this.state;
    if (timer >= 0) {
      this.setState({ timer: timer - 1 });
    } else {
      this.setState({ finished: true });
      this.clearInterval();
    }
  }

  public render() {
    const { timer, started, finished } = this.state;
    if (started && !finished) {
      const mins = Math.ceil(timer / 60);
      const secs = timer % 60;
      return <p>{`${mins}:${secs}`}</p>;
    } else {
      return this.props.children;
    }
  }
}

export default CountDown;
