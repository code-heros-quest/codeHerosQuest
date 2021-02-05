import React, { useEffect, useState } from 'react'
import client from './connect.js';
import Dice from 'react-dice-roll';

let roll = (Math.floor(Math.random() * Math.floor(6))) + 1;

const Roll = (props) => {
  const [scenario, setScenario] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    setScenario(props.scenario)
  }, [])
  let rollTag = '';
  const rollDice = () => {
    roll = (Math.floor(Math.random() * Math.floor(6))) + 1;
    setShow(true);
    rollTag = `You Rolled a ${roll}`
    let payload = { roll, scenario: scenario }
    client.emit('roll', payload);
  }

  return (
    <div>
      <Dice onRoll={rollDice} defaultValue={6} cheatValue={roll} size={100} rollingTime={2000} disabled={show}/>
    </div>
  )
}

export default Roll
