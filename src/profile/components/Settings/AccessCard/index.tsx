import React from 'react'
import CardBack from './CardBack';
import CardFront from './CardFront';
import style from './card.less';

export default class Barcode extends React.Component {
  public state = {
    card: {
      barcode: 'NTNU000000',
      rfid: '00000000000',
      code: '0000000000',
      id: '0000000000',
      studentNumber: '000000',
      name: 'Ola Nordmann'
    }
  }

	public render () {
    const { card } = this.state;
  	return (
    	<div className={style.container}>
        <CardFront {...card} />
        <CardBack {...card}/>
      </div>
    )
  }
}
