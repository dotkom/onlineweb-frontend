import React, { useEffect, useMemo, useRef } from 'react';

import Heading from 'common/components/Heading';
import { IRefObject, useRefMap } from 'common/hooks/useRefMap';

import style from './carousel.less';
import CarouselArrow from './CarouselArrow';

export interface IProps<T> {
  children: (values: Array<IRefObject<T, HTMLDivElement>>) => JSX.Element;
  values: T[];
  title?: string;
}

export function Carousel<T>({ children, values: inputValues, title = '' }: IProps<T>) {
  const initialValues = useMemo(() => inputValues, []);
  const [values, setValues] = useRefMap<HTMLDivElement, T>(initialValues);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValues(inputValues);
  }, [inputValues]);

  const getSizes = () => {
    if (values.length) {
      const [first] = values;
      if (first.ref.current && carouselRef.current) {
        return {
          element: first.ref.current.scrollWidth,
          container: carouselRef.current.clientWidth,
          position: carouselRef.current.scrollLeft,
        };
      }
    }
    return null;
  };

  const scrollToIndex = (index: number) => {
    /** Bound the index by the upper and lower limits of the array */
    const boundedIndex = index < 0 ? 0 : index >= values.length ? values.length - 1 : index;
    const target = values[boundedIndex];
    const ref = target ? target.ref.current : null;
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
  };

  const scrollToNextRef = () => {
    const sizes = getSizes();
    if (sizes) {
      /** Calculate number of places to move based on screen size */
      const amount = Math.floor(sizes.container / sizes.element);
      /** Calculate current position the array based on location of scroll */
      const currentIndex = Math.floor(sizes.position / (sizes.element + 20));
      scrollToIndex(currentIndex + amount * 2 - 1);
    }
  };

  const scrollToPrevRef = () => {
    const sizes = getSizes();
    if (sizes) {
      /** Calculate number of places to move based on screen size */
      const amount = Math.floor(sizes.container / sizes.element);
      /** Calculate current position the array based on location of scroll */
      const currentIndex = Math.ceil(sizes.position / (sizes.element + 20));
      scrollToIndex(currentIndex - amount);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.arrowContainer}>
        <CarouselArrow direction="left" onClick={scrollToPrevRef} />
        <Heading title={title} />
        <CarouselArrow direction="right" onClick={scrollToNextRef} />
      </div>
      <div className={style.carouselContainer} ref={carouselRef}>
        {values.length && children && <div className={style.carousel}>{children(values)}</div>}
      </div>
    </div>
  );
}
