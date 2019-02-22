import { Pie } from '@nivo/pie';
import { INewEvent } from 'events/models/Event';
import React from 'react';
import style from '../Orders/orders.less';

export interface ICompanyCount {
  [key: string]: number;
}

/**
 * @summary Reduces a list of events into the amount of events that company has had.
 * @description Reduces a list of events to a an object where the keys are the company name
 * and the values are the amount of events that company has arranged.
 * @param {INewEvent[]} events The list events to count companies in.
 * @returns {ICompanyCount} E.g. { 'Company1': 3, 'Company2': 8 }
 */
export function countCompanies(events: INewEvent[]): ICompanyCount {
  return events.reduce<ICompanyCount>((counted, { company_event }) => {
    for (const { company } of company_event) {
      counted[company.name] = counted[company.name] + 1 || 1;
    }
    return counted;
  }, {});
}

const createPieDatum = (count: ICompanyCount) => {
  return Object.keys(count).map((key) => ({
    label: key,
    value: count[key],
    id: key,
  }));
};

export interface IProps {
  events: INewEvent[];
}

const CompanyDonut = ({ events }: IProps) => {
  const companyCount = countCompanies(events);
  const companies = createPieDatum(companyCount);
  return (
    <div className={style.centerChart}>
      <h1>Bedrifter</h1>
      <Pie
        data={companies}
        height={300}
        width={350}
        fit
        animate
        innerRadius={0.6}
        margin={{ top: 60, right: 30, bottom: 40, left: 30 }}
      />
    </div>
  );
};

export default CompanyDonut;
