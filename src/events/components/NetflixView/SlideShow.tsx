import React, { FC, useContext } from 'react';
import style from './netflixView.less';
import LargeEvent from './LargeEvent';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

interface IProps {
  eventIds: number[];
}



const SlideShow: FC<IProps> = ({ eventIds }: IProps) => {
  return (
    <div className={style.slideshow}>

      <CarouselProvider
        visibleSlides={5}
        naturalSlideWidth={400}
        naturalSlideHeight={400}
        totalSlides={eventIds.length}
      >
        <div className={style.sliderWrapper}>
          <Slider className={style.slider}>
            {eventIds.map((eventId, index) => (
              <Slide index={index}>
                <LargeEvent key={eventId} eventId={eventId} />
              </Slide>
            ))}
          </Slider>
          <ButtonBack className={style.buttonBack}>Back</ButtonBack>
          <ButtonNext className={style.buttonNext}>Next</ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  );
};

export default SlideShow;
