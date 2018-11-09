import { Pie } from '@nivo/pie';
import Markdown from 'common/components/Markdown';
import { IOrder, IOrderLine } from 'profile/models/Orders';
import React from 'react';
import style from './orders.less';

const ABOUT_ORDER_CALENDAR = `
  # Ordrehistorikk
`;

export interface IProps {
  orderLines: IOrderLine[];
}

interface ITest {
  [name: string]: number;
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
    <div className={style.centerChart}>
      <Markdown source={ABOUT_ORDER_CALENDAR} />
      <Pie
        data={values}
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

export default OrderItemDonut;
