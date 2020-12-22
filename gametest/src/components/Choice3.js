import React, { useState } from 'react';
import client from './connect.js';

const Choice3 = (props) => {
  const [style, setStyle] = useState('choiceButtons');
  const [show, setShow] = useState('');


  let choice1 = props.scenario.choices.choice1.name;
  let choice2 = props.scenario.choices.choice2.name;
  let choice3 = props.scenario.choices.choice3.name;

  const makeChoice = (e) => {
    let vote = e.target.id;
    let payload = { vote, scenario: props.scenario }
    client.emit('choice', payload);
    setStyle('disabled')
    setShow('false')
  }
  return (
    <div>
      <div style={{ borderRadius: '8px', padding: '25px', backgroundImage: 'url(./images/choice.png)', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', objectFit: 'contain', overflow: 'auto' }}>
        <h5 style={{ color: 'black' }}>{props.scenario.choiceQuestion}</h5>
      </div>
      <button className={style} id="1" onClick={makeChoice} disabled={show}>{choice1}</button>
      <button className={style} id="2" onClick={makeChoice} disabled={show}>{choice2}</button>
      <button className={style} id="3" onClick={makeChoice} disabled={show}>{choice3}</button>
    </div>
  )
}

export default Choice3