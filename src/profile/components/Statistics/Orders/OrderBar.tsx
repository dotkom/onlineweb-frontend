import { Bar } from '@nivo/bar';
import { LIGHT_EVENT_COLORS } from 'events/models/Event';
import { IOrder, IOrderLine } from 'profile/models/Orders';
import React from 'react';
import style from './orders.less';

export interface IProps {
  orderLines: IOrderLine[];
}

const OrderBar = ({ orderLines }: IProps) => {
  const orders: IOrder[] = orderLines.reduce<IOrder[]>((prev, curr) => [...prev, ...curr.orders], []);
  const items = orders.reduce<{ [name: string]: number }>((prev, curr) => {
    const name = curr.content_object.name.replace('[Discontinued] ', '');
    const prevValues = prev.hasOwnProperty(name) ? prev[name] + curr.quantity : 1;
    return { ...prev, [name]: prevValues };
  }, {});
  const values = Object.keys(items).map((name) => ({ id: name, label: name, value: items[name] }));

  return (
    <div className={style.centerChart}>
      <h1>Varefordeling</h1>
      <Bar
        data={values}
        height={450}
        width={1050}
        margin={{
          top: 50,
          right: 130,
          bottom: 50,
          left: 60,
        }}
        colors={LIGHT_EVENT_COLORS}
        colorBy="value"
        animate
        legends={[
          {
            dataFrom: 'indexes',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 130,
            translateY: 0,
            itemsSpacing: 4,
            itemWidth: 120,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default OrderBar;
