import { IsoDate, IsoDateTime } from 'common/models/Date';
import { IUser } from 'core/models/User';
import { DateTime, Interval } from 'luxon';

export enum MarkCategory {
  NONE,
  SOCIAL,
  COMPANYPRESENTATION,
  COURSE,
  FEEDBACK,
  OFFICE,
  PAYMENT,
}

export type MarkCategoryStrings =
  | 'Ingen'
  | 'Sosialt'
  | 'Bedriftspresentasjon'
  | 'Kurs'
  | 'Tilbakemelding'
  | 'Kontoret'
  | 'Betaling';

export const getMarkCategory = (category: MarkCategory): MarkCategoryStrings => {
  switch (category) {
    case MarkCategory.NONE:
      return 'Ingen';
    case MarkCategory.SOCIAL:
      return 'Sosialt';
    case MarkCategory.COMPANYPRESENTATION:
      return 'Bedriftspresentasjon';
    case MarkCategory.COURSE:
      return 'Kurs';
    case MarkCategory.FEEDBACK:
      return 'Tilbakemelding';
    case MarkCategory.OFFICE:
      return 'Kontoret';
    case MarkCategory.PAYMENT:
      return 'Betaling';
    default:
      return 'Ingen';
  }
};

export interface IMark {
  /** Max length of 155 characters */
  expiration_date: IsoDateTime;
  mark: {
    title: string;
    added_date: IsoDate;
    given_by: IUser;
    last_changed_date: IsoDateTime;
    last_changed_by: IUser;
    category: MarkCategory;
    /** Max length of 255 characters */
    description: string;
  };
}

export interface ISuspension {
  user: IUser;
  /** Max length of 64 characters */
  title: string;
  active: boolean;
  payment_id: number;
  added_date: IsoDate;
  expiration_date: IsoDateTime;
  /** Max length of 255 characters */
  description: string;
}

export type Penalty = ISuspension | IMark;

export const sortByExpiration = (a: Penalty, b: Penalty): number => {
  return new Date(b.expiration_date).getTime() - new Date(a.expiration_date).getTime();
};

/**
 * @summary Finds the percentage of completion for an Penalty.
 * @param {Penalty} penalty Given penalty, (Prikk | Suspensjon)
 * @returns {number} Percentage of completion
 */
export const getPenaltyCompletion = (expiration: string): number => {
  // Set number of days a Penalty lasts, number between 0.0 and 100.0
  const penaltyLength = 30;

  const end = DateTime.fromISO(expiration);
  const start = end.minus({ days: penaltyLength });
  const now = DateTime.local();

  // Check if penalty is ongoing
  if (Interval.fromDateTimes(start, end).contains(now)) {
    const progress = now.diff(start).as('seconds');
    const total = end.diff(start).as('seconds');
    return Math.round((progress / total) * 100);
  } else if (now > end) {
    return 100;
  }
  return 0;
};

export type PenaltyCompletionColor = 'red' | 'white' | 'green';

export const getCompletionColor = (percentage: number): PenaltyCompletionColor => {
  switch (percentage) {
    case 100:
      return 'green';
    case 0:
      return 'white';
    default:
      return 'red';
  }
};
