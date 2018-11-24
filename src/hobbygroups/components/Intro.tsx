import React from 'react';
import style from '../less/hobbygroups.less';

const Intro = () => (
  <div className={style.intro}>
    <p>
      På denne siden finner du informasjon om alle de forskjellige interessegruppene i online. Ser du noe som ser
      interessant ut? Ta kontakt og møt noen med samme interesser som deg. Interessegruppene i Online er grupper for
      alle mulige slags interesser. Har du og en kompis eller to en sær/stilig/fantastisk interesse? Opprett en
      interessegruppe!
    </p>
    <h2>Hvordan søke om støtte til din interessegruppe?</h2>
    <p>
      Du kan søke om økonomisk støtte til din interessegruppe ved å sende en mail til{' '}
      <a href="mailto:seniorkom@online.ntnu.no">seniorkom@online.ntnu.no</a>
      <br />
      Mer informasjon om hvordan dette gjøres finnes{' '}
      <a href="https://online.ntnu.no/wiki/online/info/innsikt-og-interface/interessegrupper/">her</a>.
    </p>
  </div>
);

export default Intro;
