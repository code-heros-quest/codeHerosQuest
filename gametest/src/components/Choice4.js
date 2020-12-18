import React from 'react';
import client from './connect.js';

const Choice4 = (props) => {
  let choice1 = props.scenario.choices.choice1.name;
  let choice2 = props.scenario.choices.choice2.name;
  let choice3 = props.scenario.choices.choice3.name;
  let choice4 = props.scenario.choices.choice4.name;

  const makeChoice = (e) => {
    let vote = e.target.id;
    let payload = { vote , scenario: props.scenario }
    client.emit('choice', payload);

  }
  return (
    <div>
      <button id="1" onClick={makeChoice}>{choice1}</button>
      <button id="2" onClick={makeChoice}>{choice2}</button>
      <button id="3" onClick={makeChoice}>{choice3}</button>
      <button id="4" onClick={makeChoice}>{choice4}</button>
    </div>
  )
}

export default Choice4
