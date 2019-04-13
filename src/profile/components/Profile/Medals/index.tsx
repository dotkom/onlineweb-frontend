import React, { FC } from 'react';

import { Carousel } from 'common/components/Carousel';
import { IMedal } from 'profile/models/Medal';

import { Medal } from './Medal';

export interface IProps {
  medals: IMedal[];
}

export const Medals: FC<IProps> = ({ medals: inputMedals }) => {
  return (
    <Carousel values={inputMedals} title="Komitéverv">
      {(values) => (
        <>
          {values.map(({ value: medal, ref }, i) => (
            <Medal key={medal.committee + medal.position + medal.period + i} medal={medal} scrollRef={ref} />
          ))}
        </>
      )}
    </Carousel>
  );
};
