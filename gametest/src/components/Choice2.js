import React, { useState } from 'react';
import client from './connect.js';
import './Buttons.css'



const Choice2 = (props) => {
  const [style, setStyle] = useState('choiceButtons');
  const [show, setShow] = useState('');

  let choice1 = props.scenario.choices.choice1.name;
  let choice2 = props.scenario.choices.choice2.name;

  const makeChoice = (e) => {
    let vote = e.target.id;
    let payload = { vote , scenario: props.scenario }
    client.emit('choice', payload);
    setStyle('disabled')
    setShow('false')
    console.log('vote emitted', payload);
  }


  return (
    <div>
      <button className={style} id="1" onClick={makeChoice} disabled={show}>{choice1}</button>
      <button className={style} id="2" onClick={makeChoice} disabled={show}>{choice2}</button>
    </div>
  )
}

export default Choice2