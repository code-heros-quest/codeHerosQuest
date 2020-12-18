import React from 'react'
import client from './connect.js';

const Luck = (props) => {
  let luckTag = '';
  const flipCoin = () => {
    let luck = (Math.floor(Math.random() * Math.floor(2)));
    if (luck === 0) {
      luckTag = 'You had poor luck';
    } else {
      luckTag = 'You had good luck';
    }
    let payload = { luck , scenario: props.scenario }
    client.emit('luck', payload);
  }

  return (
    <div>
      <button onClick={flipCoin} id="luck"> Flip Coin </button>
      <p>{luckTag}</p>
    </div>
  )
}

export default Luck
