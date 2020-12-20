import React, {useState} from 'react'
import client from './connect.js';

const Roll = (props) => {
  const [buttonText, setButtonText] = useState('Roll Dice');
  


  let rollTag = '';
  const rollDice = () => {
    setButtonText('Waiting for other players...');
    let roll = (Math.floor(Math.random() * Math.floor(6))) + 1;
    rollTag = `You Rolled a ${roll}`
    let payload = { roll , scenario: props.scenario }
    client.emit('roll', payload);
  }

  return (
    <div>
      <button onClick={rollDice} id="roll">{buttonText}</button>
      <p>{rollTag}</p>
    </div>
  )
}

export default Roll
