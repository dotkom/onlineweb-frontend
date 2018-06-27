import React from 'react';
import { IPenalty } from '../../models/Penalty';
import Collapsible from 'common/components/Collapsible';
import { DateTime, Interval } from 'luxon';

export interface IProps<T> {
  penalty: T
}

/**
 * @extends React.Component
 * @summary Displays a single Penalty (Prikk | Suspensjon).
 * @description Abstract Component for displaying Marks or Suspensions.
 * @param {IPenalty} IPenalty Component needs to be supplied the type of penalty it supports.
 * @param {IPenalty} penalty Component needs to be supplied a penalty to display.
 */
abstract class Penalty<T> extends Collapsible<IProps<T>> {
  constructor(props: IProps<T>) {
    super(props);
  }

  /**
   * @summary Finds the percentage of completion for an IPenalty.
   * @param {IPenalty} penalty Given penalty, (Prikk | Suspensjon)
   * @returns {number} Percentage of completion
   */
  getPenaltyCompletion(penalty: IPenalty): number {
    // Set number of days a Penalty lasts, number between 0.0 and 100.0
    const penaltyLength = 30;

    const end = DateTime.fromISO(penalty.expiration_date);
    const start = end.minus({ days: penaltyLength });
    const now = DateTime.local();

    // Check if penalty is ongoing
    if (Interval.fromDateTimes(start, end).contains(now)) {
      const progress = now.diff(start).as('seconds')
      const total = end.diff(start).as('seconds')
      return Math.round((progress / total) * 100)
    } else if (now > end) {
      return 100
    }
    return 0;
  }

  getCompletionColor(percentage: number): 'red' | 'white' | 'gray' {
    switch(percentage) {
      case 100: return 'gray';
      case 0: return 'white';
      default: return 'red';
    }
  }

  static sortByExpiration(a: IPenalty, b: IPenalty): number {
    return new Date(b.expiration_date).getTime() - new Date(a.expiration_date).getTime();
  }

  abstract render(): JSX.Element
}

export default Penalty;
