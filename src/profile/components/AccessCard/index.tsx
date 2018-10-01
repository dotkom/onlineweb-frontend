import React from 'react'
import CardBack from './CardBack';
import CardFront from './CardFront';

export default class Barcode extends React.Component {
  state = {
    card: {
      //barcode: 'NTNU572852',
      barcode: 'NTNU000000',
      rfid: '36523789652',
      code: '1879983670',
      id: '1636708762',
      studentNumber: '766854',
      name: 'Ole Anders Stokker'
    }
  }

	render () {
    const { card } = this.state;
  	return (
    	<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center' }}>
        <div style={{ width: '30rem', height: '48rem' }}><CardFront {...card} /></div>
        <div style={{ width: '48rem', height: '30rem' }}><CardBack {...card}/></div>
      </div>
    )
  }
}
