import React from 'react';
import CardBack from './CardBack';
import CardFront from './CardFront';
import style from './card.less';
import Markdown from 'react-markdown';

const INFO_TEXT = `
  # NTNU Adganskort

  ## Bruk

  Adganskortet kan brukes til en rekke ting an Lineforeningen Online.
  Dette inkluderer:

  - 1. Verifisering av identitet og oppmøte på arrangementer.
  - 2. Kjøp i kiosksystemet Nibble på Onlinekontoret.

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
        <Markdown source={INFO_TEXT} />
        <div className={style.container}>
          <CardFront {...card} />
          <CardBack {...card} />
        </div>
      </>
    );
  }
}
