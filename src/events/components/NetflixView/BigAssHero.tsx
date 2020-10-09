import React, { FC, useContext, useEffect, useState } from 'react';
import EventImage from '../EventImage';
import style from './netflixView.less';
import { HoveredEventContext } from '.';
import { IEvent } from 'events/models/Event';


const withFading = (Faded: FC, duration: number, key: number) => {
  const inEffect = `
    @keyframes react-fade-in {
      0%   { opacity: 0; }
      100% { opacity: 1; }
    }
  `;

  return (
    <div key={key}>
      <style children={inEffect} />
      <div style={{
        animationDuration: `${duration}s`,
        animationIterationCount: 1,
        animationName: "react-fade-in",
        animationTimingFunction: 'ease-in'
      }}
      ><Faded /></div>
    </div>
  )

}


type EventImageInstance = React.ReactNode

const BigAssHero: FC = () => {
  const { hoveredEvent } = useContext(HoveredEventContext)
  const [imageComponents, setImageComponents] = useState([] as EventImageInstance[])

  useEffect(() => {
    if (hoveredEvent) {
      const { images, event_type, event_type_display, title, start_date, id } = hoveredEvent
      const newImageComponents = [...imageComponents, withFading(() => <EventImage key={id} className={style.HeroImage} images={images} size={"original"} />, 2, id)]
      if(newImageComponents.length > 3){
        newImageComponents.shift()
      }
      setImageComponents(newImageComponents)
    }
  }, [hoveredEvent])

  return (
    <div className={style.hero}>
      <div className={style.imageContainer}>
        {imageComponents}
      </div>
    </div>)
}

export default BigAssHero;
