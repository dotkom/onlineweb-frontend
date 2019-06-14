import React, { FC, useEffect, useState } from 'react';

import style from './toast.less';

export interface IProps {
  /** Milliseconds for the progress to last */
  duration: number;
  /** What happends after the progress bar has finished */
  onFinish: () => void;
}

const INIT_WAIT = 50;

export const Progress: FC<IProps> = ({ duration, onFinish }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setReady(true), INIT_WAIT);
    setTimeout(() => onFinish(), duration + INIT_WAIT);
  }, []);

  /** Convert duartion in millis to css readable format */
  const transitionDuration = `${duration}ms`;
  /**
   * Width needs to be 0% when the component mounts to the DOM.
   * It is set to 100% percent to trigger the transition from 0% to 100%.
   */
  const width = ready ? '100%' : '0%';

  return (
    <div className={style.countDownProgress}>
      <div className={style.progressBar} style={{ width, transitionDuration }} />
    </div>
  );
};
