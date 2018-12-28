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

  /**
   * Initialize timeouts and intervals on component mount.
   * Will therefore not run on server for SSR.
   */
  public componentDidMount() {
    this.initTimeout();
    this.initTriggerTimeouts();
  }

  /**
   * All timeouts and intervals will need to be cleared when the component unmounts,
   * because they may handle the `this`/state of this, or other components.
   */
  public componentWillUnmount() {
    this.clearTimeout();
    this.clearInterval();
    this.clearTriggerTimeouts();
  }

  /**
   * Initialize the pre countdown timeout.
   * This will wait with starting the visual countdown until the offset is reached.
   */
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

  /**
   * Initialize timeouts for triggers.
   * Set timeouts to call trigger function when the countdown is finished.
   */
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

  /**
   * Starts the visual countdown which the user sees.
   * The interval triggers every secound, and ticks the counter down.
   */
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

  /**
   * A single tick of the countdown.
   * If the end is not reached, count down a single second.
   * It not, set the count as finished, and stop the interval from running again.
   */
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
