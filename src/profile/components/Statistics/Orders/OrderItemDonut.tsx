import { ResponsivePie } from '@nivo/pie';
import classnames from 'classnames';
import React from 'react';

import { LIGHT_EVENT_COLORS } from 'events/models/Event';
import { IOrder, IOrderLine } from 'profile/models/Orders';

import style from './orders.less';

export interface IProps {
  orderLines: IOrderLine[];
}

const OrderItemDonut = ({ orderLines }: IProps) => {
  /** TODO: Allow flatMap */
  const orders: IOrder[] = orderLines.reduce<IOrder[]>((prev, curr) => [...prev, ...curr.orders], []);
  const categories = orders.reduce<{ [name: string]: number }>((prev, curr) => {
    const { name } = curr.content_object.category;
    const prevValues = prev.hasOwnProperty(name) ? prev[name] + curr.quantity : 1;
    return { ...prev, [name]: prevValues };
  }, {});
  const values = Object.keys(categories).map((name) => ({ id: name, label: name, value: categories[name] }));

  return (
    <div className={classnames(style.centerChart, style.pieChart)}>
      <h1>Kategorier</h1>
      <ResponsivePie
        data={values}
        fit
        animate
        innerRadius={0.6}
        colors={LIGHT_EVENT_COLORS.reverse()}
        margin={{ top: 60, right: 30, bottom: 40, left: 30 }}
      />
    </div>
  );
};

export default OrderItemDonut;
