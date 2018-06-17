import React from 'react';
import { DOMAIN } from 'common/constants/endpoints';

export type ErrorCode = 401 | 403 | 404

export interface Props {
  code: ErrorCode
}

const errorString = (code: ErrorCode): string => {
  switch(code) {
    case(404): return 'Page not found';
    default: return ''
  }
}

const NotFound = ({ code }: Props) => (
  <section id="error">
    <div className="container-fluid">
      <div className="row-fluid">
        <div className="col-md-12">
          <div className="page-header">
            <h2 id="error-heading">{`${code} Error: ${errorString(code)}`}</h2>
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
