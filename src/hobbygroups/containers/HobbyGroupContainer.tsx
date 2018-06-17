import React from 'react';
import HobbyGroupList from '../components/HobbyGroupList';
import Authenticate from 'authentication/components/Authenticate';
import HttpError from 'core/components/errors/HttpError';

const HobbyGroupContainer = () => (
  <Authenticate authentication="view_hobbys" alt={<HttpError code={404} />}>
    <section id="hobbygroups">
      <div className="container">
        <div className="col-md-12">
          <div className="page-header">
            <h1 id="resourcecenter-heading">Interessegrupper</h1>
          </div>
        </div>

        <div className="row" id="introduction">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="col-md-12">
              <p>
                På denne siden finner du informasjon om alle de forskjellige interessegruppene i online.
                Ser du noe som ser interessant ut? Ta kontakt og møt noen med samme interesser som deg.
                Interessegruppene i Online er grupper for alle mulige slags interesser.
                Har du og en kompis eller to en sær/stilig/fantastisk interesse? Opprett en interessegruppe!
                Da kan du finne flere som deler din interesse og har mulighet til å søke om støtte fra hovedstyre.
              </p>
              <hr />
            </div>
          </div>
        </div>

        <div className="row">
          <HobbyGroupList />
        </div>

      </div>
    </section>
  </Authenticate>
);

export default HobbyGroupContainer;
