import Markdown from 'common/components/Markdown';
import React from 'react';
import style from '../less/hobbygroups.less';

const introText = `
  På denne siden finner du informasjon om alle de forskjellige interessegruppene i online. Ser du noe som ser
  interessant ut? Ta kontakt og møt noen med samme interesser som deg. Interessegruppene i Online er grupper for
  alle mulige slags interesser. Har du og en kompis eller to en sær/stilig/fantastisk interesse? Opprett en
  interessegruppe!

  ## Hvordan søke om støtte til din interessegruppe?

  Du kan søke om økonomisk støtte til din interessegruppe ved å sende en mail til <seniorkom@online.ntnu.no>

  Mer informasjon om hvordan dette gjøres finnes
  [her](https://online.ntnu.no/wiki/online/info/innsikt-og-interface/interessegrupper/).
`;

const Intro = () => (
  <div className={style.intro}>
    <Markdown source={introText} />
  </div>
);

export default Intro;
