import React from 'react';
import { STATIC_URL } from 'common/constants/endpoints';
import style from './header.less';

const MainSponsor = () => (
  <a href="http://www.knowit.no/" className={style.sponsor}>
    <img
      className={style.sponsorLogo}
      src={`${STATIC_URL}img/knowit.svg`}
      alt="Hovedsamarbeidspartner - Knowit"
    />
    <p className={style.sponsorText}>Hovedsamarbeidspartner</p>
  </a>
);

export default MainSponsor;
