'use client';

import style from './aprilfools.less';
import React, { useEffect, useState } from 'react';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import { __DEV__ } from '../../../common/constants/environment';

const enabled = new Date(2024, 3, 2) > new Date();

const AprilFoolsCaptcha = () => {
  const stages = [Stage1, Stage2];
  const [stageNum, setStageNum] = useState(0);
  const [finished, setFinished] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('aprilfoolsdone') !== 'true') {
      setFinished(false);
    }
  }, []);

  if (finished || !enabled) {
    return null;
  }

  const nextStage = () => {
    if (stageNum < stages.length - 1) {
      setStageNum(stageNum + 1);
    } else {
      if (!__DEV__) {
        localStorage.setItem('aprilfoolsdone', 'true');
      }
      setFinished(true);
    }
  };

  const Stage = stages[stageNum];

  return (
    <div className={style.aprilfoolsContainer}>
      <div className={style.aprilfoolsContent}>{<Stage nextStage={nextStage} />}</div>
    </div>
  );
};

export default AprilFoolsCaptcha;
