import Markdown from 'common/components/Markdown';
import { Page, Pane } from 'common/components/Panes';
import React from 'react';
import style from './card.less';
import CardBack from './CardBack';
import CardFront from './CardFront';
import EditCard from './EditCard';

const INFO_TEXT = `
  # NTNU Adganskort

  Adganskortet kan brukes til en rekke ting an Lineforeningen Online.
  Dette inkluderer:

  - 1. Verifisering av identitet og oppmøte på arrangementer.
  - 2. Kjøp i kiosksystemet Nibble på Onlinekontoret.
`;

const ABOUT_EDIT_CARD = `
  ## Register eller endre kortet ditt

  For å registrere kortet ditt, trenger du bare å skrive inn EM koden du finner på baksiden.
  
  Gjennom litt magi kan vi regne ut RFID koden til kortet, og kortet skal så være mulig å bruke!
`;

const ABOUT_CARD_GRAPHIC = `
  ## Grafisk Representasjon

  Kortet som vises under er bare en grafisk representasjon av ditt NTNU kort.
  Det ikke kanskje ikke helt korrekt vist helt ennå,
  og vi sette gjere pris på tips til hvordan vi kan gjøre representasjonen bedre.
`;

export default class Barcode extends React.Component {
  public state = {
    card: {
      barcode: 'NTNU000000',
      rfid: '00000000000',
      code: '0000000000',
      id: '0000000000',
      studentNumber: '000000',
      name: 'Ola Nordmann',
    },
  };

  public render() {
    const { card } = this.state;
    return (
      <>
        <Pane>
          <Markdown source={INFO_TEXT} />
        </Pane>
        <Pane>
          <Markdown source={ABOUT_EDIT_CARD} />
          <EditCard emCode={card.code} />
        </Pane>
        <Pane>
          <Markdown source={ABOUT_CARD_GRAPHIC} />
          <div className={style.container}>
            <CardFront {...card} />
            <CardBack {...card} />
          </div>
        </Pane>
      </>
    );
  }
}
