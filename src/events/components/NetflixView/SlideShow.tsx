import React, { FC, useContext } from 'react';
import style from './netflixView.less';
import LargeEvent from './LargeEvent';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import CarouselArrow from 'common/components/Carousel/CarouselArrow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';

interface IProps {
  eventIds: number[];
}



const SlideShow: FC<IProps> = ({ eventIds }: IProps) => {
  return (
    <div className={style.slideshow}>

      <CarouselProvider
        visibleSlides={5}
        naturalSlideWidth={500}
        naturalSlideHeight={400}
        totalSlides={eventIds.length}
        step={5}
      >
        <div className={style.sliderWrapper}>
          <Slider className={style.slider}>
            {eventIds.map((eventId, index) => (
              <Slide index={index}>
                <LargeEvent key={eventId} eventId={eventId} />
              </Slide>
            ))}
          </Slider>
          <ButtonBack className={style.buttonBack}>
            <FontAwesomeIcon icon={faArrowLeft} size="3x" />
          </ButtonBack>
            <ButtonNext className={style.buttonNext}>
              <FontAwesomeIcon icon={faArrowRight} size="3x" />
            </ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  );
};

export default SlideShow;
