import { getEventColor, getEventType } from 'events/models/Event';
import React from 'react';
import style from './image.less';

interface IProps {
  event_type: number;
}

const LargeEventPlaceholder = ({ event_type }: IProps) => {
  const eventTypeName = getEventType(event_type);
  return (
    <>
      <div className={style.large}>
        <h2 className={style.imageLargeType} style={{ background: getEventColor(event_type) }}>
          {eventTypeName}
        </h2>
        <svg
          className={style.largeImageEmpty}
          width="180"
          height="143"
          viewBox="0 0 180 143"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M28.3569 106.889C33.5712 115.747 44.1932 128.945 61.5482 136.54C78.9032 144.135 98.5643 144.525 116.206 137.624C133.849 130.723 148.027 117.096 155.622 99.7412C163.217 82.3862 162.143 66.8179 159.821 55.0322L144.214 66.9965C144.464 68.9608 145.602 79.6647 139.839 92.8337C134.075 106.003 123.317 116.343 109.93 121.579C96.5432 126.816 81.6243 126.52 68.4557 120.757C55.2868 114.994 49.4639 107.354 44.2854 99.9251L28.3569 106.889Z" />
          <path d="M152.321 36.2107C147.5 27.1751 136.158 13.5871 118.803 5.992C101.448 -1.60309 81.7871 -1.9929 64.1446 4.90829C46.5025 11.8095 32.3243 25.4364 24.7292 42.7914C16.9642 60.2107 18.2143 77.7107 20.3443 86.4286L36.0425 73.8179C36.0425 73.8179 34.9998 63.2464 40.5128 49.6986C46.276 36.53 57.0343 26.1898 70.421 20.9532C83.8082 15.7166 98.7268 16.0124 111.896 21.7755C125.064 27.5386 132.5 36.8179 136.732 43.7107L152.321 36.2107Z" />
          <path d="M89.8214 39.6749L94.8214 71.6392L179.821 30.925L81.4286 106.639L77.3214 78.0678L0 111.818L89.8214 39.6749Z" />
        </svg>
        <div className={style.largeContentEmpty}>
          <p>Vi er tom for arrangementer av typen {eventTypeName}</p>
        </div>
      </div>
    </>
  );
};

export default LargeEventPlaceholder;
