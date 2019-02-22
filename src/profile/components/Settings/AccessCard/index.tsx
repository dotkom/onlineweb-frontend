import React, { useContext } from 'react';

import Markdown, { md } from 'common/components/Markdown';
import { Pane } from 'common/components/Panes';
import { UserProfileContext } from 'profile/providers/UserProfile';
import { toggleEMandRFID } from 'profile/utils/rfid';

import style from './card.less';
import CardBack from './CardBack';
import CardFront from './CardFront';
import EditCard from './EditCard';

const INFO_TEXT = md`
  # NTNU Adganskort

  Adganskortet kan brukes til en rekke ting an Lineforeningen Online.
  Dette inkluderer:

  - 1. Verifisering av identitet og oppmøte på arrangementer.
  - 2. Kjøp i kiosksystemet Nibble på Onlinekontoret.
`;

const ABOUT_EDIT_CARD = md`
  ## Register eller endre kortet ditt

  For å registrere kortet ditt, trenger du bare å skrive inn EM koden du finner på baksiden.

  Gjennom litt magi kan vi regne ut RFID koden til kortet, deretter skal kortet være mulig å bruke!
`;

const ABOUT_CARD_GRAPHIC = md`
  ## Grafisk Representasjon

  Kortet som vises under er bare en grafisk representasjon av ditt NTNU kort.
  Det ikke kanskje ikke helt korrekt vist helt ennå,
  og vi sette gjere pris på tips til hvordan vi kan gjøre representasjonen bedre.
`;

const registeredCard = (rfid: string) => `
  ### Nåværende registrert kort
  **EM kode**: ${toggleEMandRFID(rfid)}\n
  **RFID**: ${rfid}
`;

const NOT_REGISTERED = `
  _Du har ikke registrert et studentkort_.
`;

export const Barcode = () => {
  const { user, refetch } = useContext(UserProfileContext);
  return (
    <>
      <Pane>{INFO_TEXT}</Pane>
      <Pane>
        {ABOUT_EDIT_CARD}
        <br />
        {user && user.rfid ? <Markdown source={registeredCard(user.rfid)} /> : NOT_REGISTERED}
        <EditCard refetchProfile={refetch} />
      </Pane>
      <Pane>
        {ABOUT_CARD_GRAPHIC}
        <div className={style.container}>
          <CardFront />
          <CardBack />
        </div>
      </Pane>
    </>
  );
};

export default Barcode;
