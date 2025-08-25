import Markdown from 'common/components/Markdown';
import React from 'react';
import style from '../less/hobbygroups.less';
import { Button } from '@dotkomonline/design-system';

const introText = `
  På denne siden finner du informasjon om alle de forskjellige interessegruppene i online. Ser du noe som ser
  interessant ut? Ta kontakt og møt noen med samme interesser som deg. Interessegruppene i Online er grupper for
  alle mulige slags interesser. Har du og en kompis eller to en sær/stilig/fantastisk interesse? Opprett en ny 
  interessegruppe eller gjenoppstart en inaktiv interessegruppe!

  Mer informasjon om hvordan dette gjøres finnes
  [her](https://wiki.online.ntnu.no/info/innsikt-og-interface/interessegrupper/).
`;

const Intro = () => (
  <div className={style.intro}>
    <Markdown source={introText} />
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSebaBslZ3nmh2wubQ_mPJYYU2XNIRlJZ1BooFuH7y6wxylaWA/viewform"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button className={style.leftbtn} aria-label="Opprett interessegruppe">
        Opprett interessegruppe
      </Button>
    </a>
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLScr27q7C4gDvzHXajydznfFxPs7JaGpgYrNX4RPiVRvUHXVGg/viewform?pli=1"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button aria-label="Søk om støtte">Søk om støtte</Button>
    </a>
  </div>
);

export default Intro;
