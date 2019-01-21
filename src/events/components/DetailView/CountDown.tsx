import { DateTime } from 'luxon';
import React, { Component } from 'react';

export interface ITrigger {
  method: () => void;
  offset: number;
}

export interface IProps {
  triggers?: ITrigger[];
  startOffset?: number;
  endTime: DateTime;
  /** Luxon DateTime format string */
  format?: string;
}

const DEFAULT_OFFSET = 15 * 60 * 1000; // 15 minutes
const DEFAULT_TRIGGERS: ITrigger[] = [];
const DEFAULT_FORMAT = 'd MMM HH:mm';

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
  public initTimeout = () => {
    const { endTime, startOffset = DEFAULT_OFFSET } = this.props;

    const endTimeMillis = endTime.toMillis();
    const countDownStart = endTimeMillis - startOffset;
    const now = DateTime.local().toMillis();
    const millisToCountDownStart = countDownStart - now;
    const millisToCountDownEnd = endTimeMillis - now;

    if (millisToCountDownEnd <= 0) {
      this.setState({ started: true, finished: true });
    } else if (millisToCountDownEnd > 0 && millisToCountDownStart <= 0) {
      this.initInterval(millisToCountDownEnd);
    } else if (millisToCountDownStart > 0) {
      this.preCountDownTimeoutHandle = window.setTimeout(this.initInterval, millisToCountDownStart);
    }
  }

  public clearTimeout = () => {
    clearTimeout(this.preCountDownTimeoutHandle);
  }

  /**
   * Initialize timeouts for triggers.
   * Set timeouts to call trigger function when the countdown is finished.
   */
  public initTriggerTimeouts = () => {
    const { triggers = DEFAULT_TRIGGERS, endTime } = this.props;
    const millisToCountDownEnd = endTime.toMillis() - DateTime.local().toMillis();
    this.triggerTimeoutHandles = triggers.map((trigger) => {
      const offset = millisToCountDownEnd + trigger.offset;
      const timeout = window.setTimeout(trigger.method, offset);
      return timeout;
    });
  }

  public clearTriggerTimeouts = () => {
    this.triggerTimeoutHandles.forEach((handle) => clearTimeout(handle));
  }

  /**
   * Starts the visual countdown which the user sees.
   * The interval triggers every secound, and ticks the counter down.
   */
  public initInterval = (offset?: number) => {
    const { startOffset = DEFAULT_OFFSET } = this.props;
    const timer = Math.ceil((offset || startOffset) / 1000);
    this.setState({ timer, started: true }, () => {
      this.countDownIntervalHandle = window.setInterval(this.countDownTick, 1000);
    });
  }

  public clearInterval = () => {
    clearInterval(this.countDownIntervalHandle);
  }

  /**
   * A single tick of the countdown.
   * If the end is not reached, count down a single second.
   * It not, set the count as finished, and stop the interval from running again.
   */
  public countDownTick = () => {
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
    const { endTime, format = DEFAULT_FORMAT } = this.props;
    if (started && !finished) {
      const mins = Math.floor(timer / 60);
      const secs = timer % 60;
      return <p>{mins === 0 ? secs : `${mins}:${secs < 10 ? `0${secs}` : secs}`}</p>;
    } else {
      return <p>{ endTime.toFormat(format) }</p>
    }
  }
}

export default CountDown;
