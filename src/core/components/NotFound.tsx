import React from 'react';
import { DOMAIN } from 'common/constants/endpoints';

const NotFound = () => (
  <section id="error">
    <div className="container-fluid">
      <div className="row-fluid">
        <div className="col-md-12">
          <div className="page-header">
            <h2 id="error-heading">404 Error: Page not found</h2>
          </div>
        </div>
      </div>
      <div className="error-items centered">
        <img className="panel-body" src={`${DOMAIN}/static/img/404Balloon.gif`} />
        <p>Siden du har bedt om finnes ikke.</p>
      </div>
    </div>
  </section>
);

export default NotFound;
