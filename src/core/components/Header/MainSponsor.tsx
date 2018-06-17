import React from 'react';
import { STATIC_URL } from 'common/constants/endpoints';

const MainSponsor = () => (
  <div id="main-sponsor">
    <a href="http://www.knowit.no/" id="ms-ref">
      <img className="ms-img" src={`${STATIC_URL}img/knowit.svg`} alt="Hovedsamarbeidspartner - Knowit" />
    </a>
    <span className="ms-span">Hovedsamarbeidspartner</span>
  </div>
);

export default MainSponsor;
