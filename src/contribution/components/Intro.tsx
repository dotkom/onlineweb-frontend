import React from 'react';
import style from '../less/contribution.less';

const Intro = () => (
  <div className={style.intro}>
    <p>
      Her finner du alle open source prosjekter som online og dotkom jobber med. Er du interessert
      i koding, samt ønsker å bidra til våre github repositorier? Da er dette stedet for deg!
      Ved å bidra med utvikle vår kodebase, kan du ha direkte påvirkning på onlineres hverdag!
      Husk å følg våre retningslinjer, men gjerne kom med kreative og nyvinnende innspill.
      Et godt sted å begynne kan f.eks være issues i et av de forskjellige repositoriene.
    </p>
    <p>
      Ikke bare oppnår du heder og ære ved å bidra til og forbedre studenters hverdag, men du får
      også en kul sticker som bemerkelse på at du har tatt del i det spesifikke prosjektet!
      Kanskje det tilogmed kommer godt med på cv'en?
    </p>
    <h1>Hvordan komme i gang?</h1>
    <br/>
    <p>
      For å komme i gang med kodingen, er du først nødt til å velge deg ut et prosjekt som høres
      spennende ut! Det er også lurt å plukke et prosjekt som passer dine tidligere erfaringer med
      programmering.
      Happy Hacking!
    </p>
    <hr/>
  </div>
);

export default Intro;
