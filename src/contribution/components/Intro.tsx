import React from 'react';
import Markdown from 'react-markdown';
import style from '../less/contribution.less';

const ABOUT_CONTRIBUTION_INTRO = `
  Her finner du alle open source prosjekter som online og dotkom jobber med. Er du interessert i koding, samt ønsker
  å bidra til våre github repositorier? Da er dette stedet for deg! Ved å bidra med utvikle vår kodebase, kan du ha
  direkte påvirkning på onlineres hverdag! Husk å følg våre retningslinjer, men gjerne kom med kreative og
  nyvinnende innspill. Et godt sted å begynne kan f.eks være issues i et av de forskjellige repositoriene.
`;

const ABOUT_CONTRIBUTION_OPPORTUNITY = `
  Dette er en gyllen anledning til å få hands-on erfaring med programmering, benytte teorien man har lært ved
  undervisning og opparbeide gode vaner innen bruk av git, clean code og andre metodikker og verktøy. Ikke bare
  oppnår du heder og ære ved å bidra til og forbedre studenters hverdag, men du får også en kul sticker som
  bemerkelse på at du har tatt del i det spesifikke prosjektet! Kanskje det tilogmed kommer godt med på cv'en, eller
  i et eventuelt intervju med dotkom om du senere skulle ønske et verv i en kommite?
`;

const ABOUT_CONTRIBUTION_HOWTO = `
  ## Hvordan komme i gang?  
  For å komme i gang med kodingen, er du først nødt til å velge deg ut et prosjekt som høres spennende ut! Det er
  også lurt å plukke et prosjekt som passer dine tidligere erfaringer med programmering. Happy Hacking!
`;

const Intro = () => (
  <div className={style.intro}>
    <Markdown source={ABOUT_CONTRIBUTION_INTRO} />
    <Markdown source={ABOUT_CONTRIBUTION_OPPORTUNITY} />
    <Markdown source={ABOUT_CONTRIBUTION_HOWTO} />
    <hr />
  </div>
);

export default Intro;
