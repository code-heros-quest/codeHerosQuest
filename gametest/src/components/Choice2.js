import React from 'react';
import client from './connect.js';

const Choice2 = (props) => {
  let choice1 = props.scenario.choices.choice1.name;
  let choice2 = props.scenario.choices.choice2.name;

  const makeChoice = (e) => {
    let vote = e.target.id;
    let payload = { vote , scenario: props.scenario }
    client.emit('choice', payload);
    console.log('vote emitted', payload);

  }
  return (
    <div>
      <button id="1" onClick={makeChoice}>{choice1}</button>
      <button id="2" onClick={makeChoice}>{choice2}</button>
    </div>
  )
}

export default Choice2