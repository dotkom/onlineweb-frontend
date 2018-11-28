import { BarExtendedDatum, ResponsiveBar } from '@nivo/bar';
import classNames from 'classnames';
import { LIGHT_EVENT_COLORS } from 'events/models/Event';
import { IOrder, IOrderLine } from 'profile/models/Orders';
import React from 'react';
import style from './orders.less';

export interface IProps {
  orderLines: IOrderLine[];
}

const Tooltip = ({ value, indexValue }: BarExtendedDatum) => (
  <span>
    {indexValue} - {value}
  </span>
);

const OrderBar = ({ orderLines }: IProps) => {
  const orders: IOrder[] = orderLines.reduce<IOrder[]>((prev, curr) => [...prev, ...curr.orders], []);
  const items = orders.reduce<{ [name: string]: number }>((prev, curr) => {
    const name = curr.content_object.name.replace('[Discontinued] ', '');
    const prevValues = prev.hasOwnProperty(name) ? prev[name] + curr.quantity : 1;
    return { ...prev, [name]: prevValues };
  }, {});
  const values = Object.keys(items).map((name) => ({ id: name, label: name, value: items[name] }));

  return (
    <div className={classNames(style.centerChart, style.barChart)}>
      <h1>Varefordeling</h1>
      <ResponsiveBar
        data={values}
        margin={{
          top: 65,
          right: 65,
          bottom: 175,
          left: 65,
        }}
        enableLabel={false}
        tooltip={Tooltip}
        colors={LIGHT_EVENT_COLORS}
        colorBy="value"
        animate
        axisBottom={{
          tickRotation: -90,
        }}
      />
    </div>
  );
};

export default OrderBar;
