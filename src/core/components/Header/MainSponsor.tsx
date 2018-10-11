import React from 'react';
import { STATIC_URL } from 'common/constants/endpoints';
import style from './header.less';

const MainSponsor = () => (
  <div className={style.sponsor}>
    <a href="http://www.knowit.no/">
      <img className={style.sponsorLogo} src={`${STATIC_URL}img/knowit.svg`} alt="Hovedsamarbeidspartner - Knowit" />
    </a>
    <span className={style.sponsorText}>Hovedsamarbeidspartner</span>
  </div>
);

export default MainSponsor;
