import style from '../aprilfools.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const AprilFoolsStage1 = ({ nextStage }: { nextStage: () => void }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h1>Er du en robot?</h1>

      <div className={style.aprilfoolsCaptcha}>
        {loading && (
          <FontAwesomeIcon className={style.aprilfoolsSpinner} icon={faSpinner} color="#3C8DEF" size={'4x'} />
        )}
        {!loading && (
          <div
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                nextStage();
              }, 500);
            }}
            className={style.aprilfoolsCaptchaInput}
          />
        )}
        <p>Jeg er ikke en robot</p>
        <img src="https://old.online.ntnu.no/wiki/70/plugin/attachments/download/680/" alt="Online linjeforening" />
      </div>
    </>
  );
};

export default AprilFoolsStage1;
