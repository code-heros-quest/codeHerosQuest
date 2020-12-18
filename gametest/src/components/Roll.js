import React from 'react'
import client from './connect.js';

const Roll = (props) => {
  let rollTag = '';
  const rollDice = () => {
    let roll = (Math.floor(Math.random() * Math.floor(6))) + 1;
    rollTag = `You Rolled a ${roll}`
    let payload = { roll , scenario: props.scenario }
    client.emit('roll', payload);
  }

  return (
    <div>
      <button onClick={rollDice} id="roll"> Roll </button>
      <p>{rollTag}</p>
    </div>
  )
}

export default Roll
