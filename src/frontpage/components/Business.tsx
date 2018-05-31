import React from 'react';

const Business = () => (
  <section id="business">
    <div className="page-header clearfix">
      <div className="row">
        <div className="col-md-12">
          <h1 id="business-heading">Bedrifter</h1>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-7 col-md-6">
        <div className="ingress">
          <p>Er du en bedrift som er på jakt etter skarpe IT-studenter?<br />
            Da vil vi gjerne høre fra deg! Les videre for å finne ut hva vi kan tilby.</p>
        </div>
        <div className="business-text">
          <p>Online er linjeforeningen for informatikkstudentene ved NTNU. Våre studenter går Bachelor- eller
          Mastergradstudium i informatikk. Dette innebærer blant annet å lære om utvikling, forbedring, evaluering
          og bruk av datasystemer. For mer informasjon om studiet, se NTNU sine
                      <a href="http://www.ntnu.no/studier/informasjonsteknologi-informatikk" target="_blank">offisielle nettsider.</a></p>
          <p>Linjeforeningen har gjennom flere år opparbeidet seg et repertoar av tjenester som vi tilbyr våre studenter.
          I samarbeid med næringslivet tilbyr vi kurs og bedriftspresentasjoner for å gi studentene våre en bredere og dypere
                      fagkunnskap samt et innblikk i hverdagen til aktuelle arbeidsplasser.</p>
          <p>Send oss en forespørsel for å komme i kontakt. Vi gleder oss til å samarbeide med dere!</p>
          <p>
            <span className="sales-contact">
              <span><i className="glyphicon glyphicon-chevron-right"></i>
                <a href="mailto:bedkom@online.ntnu.no" title="bedkom@online.ntnu.no">Send epost til bedriftskontakt</a></span>
            </span>
          </p>
        </div>
      </div>
      <div className="col-sm-5 col-md-6">
        <div className="row">
          <div className="col-md-6">
            <div className="col-md-12 sale-box">
              <div className="sale-heading">Profilering</div>
            </div>
            <div className="col-md-12 sale-content">
              <ul className="list-unstyled sale-points">
                <li><span className="glyphicon glyphicon-ok"></span> Bedriftspresentasjon</li>
                <li><span className="glyphicon glyphicon-ok"></span> Annonse i Offline</li>
                <li><span className="glyphicon glyphicon-ok"></span> Stillingsutlysning</li>
              </ul>
              <div className="link" style={{ textAlign: 'center' }}>
                <a href="#business-profiling" data-toggle="modal">Les mer</a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-12 sale-box">
              <div className="sale-heading">Faglig</div>
            </div>
            <div className="col-md-12 sale-content">
              <ul className="list-unstyled sale-points">
                <li><span className="glyphicon glyphicon-ok"></span> Kurs/kursserie</li>
                <li><span className="glyphicon glyphicon-ok"></span> Workshop</li>
                <li><span className="glyphicon glyphicon-ok"></span> Hackathon</li>
              </ul>
              <div className="link" style={{ textAlign: 'center' }}>
                <a href="#business-academic" data-toggle="modal">Les mer</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Business;
