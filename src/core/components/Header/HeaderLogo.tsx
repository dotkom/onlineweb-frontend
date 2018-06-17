import React from 'react';
import { Link } from 'react-router-dom';
import { STATIC_URL } from 'common/constants/endpoints';
import { routes } from 'App';

const HeaderLogo = () => (
  <ul className="mn-collapse">
    <li>
      <button id="mainnav-button">
        <svg x="0px" y="0px" width="100%" viewBox="0 0 96 96" className="mn-svg" enableBackground="new 0 0 96 96">
          <rect width="32" height="4" x="32" y="46" className="mn-svg-rect-top"></rect>
        </svg>
        <svg x="0px" y="0px" width="100%" viewBox="0 0 96 96" className="mn-svg" enableBackground="new 0 0 96 96">
          <rect width="32" height="4" x="32" y="46" className="mn-svg-rect-bottom"></rect>
        </svg>
      </button>
    </li>
    <li>
      <Link to={routes.home}>
        <img src={`${STATIC_URL}img/online_logo.svg`} alt="Online" className="online-logo" />
      </Link>
    </li>
  </ul>
);

export default HeaderLogo;
