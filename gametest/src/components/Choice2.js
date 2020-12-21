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
    let payload = { vote, scenario: props.scenario }
    client.emit('choice', payload);
    setStyle('disabled')
    setShow('false')
    console.log('vote emitted', payload);
  }


  return (
    <div>
      <div style={{ padding: '10px 5px 5px 5px', borderRadius: '8px', border: '9px solid #854215', width: '50%', height: 'auto', margin: 'auto', backgroundImage: 'url(./images/textBox/text1.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <h5 style={{ color: 'black' }}>{props.scenario.choiceQuestion}</h5>
      </div>
      <button className={style} id="1" onClick={makeChoice} disabled={show}>{choice1}</button>
      <button className={style} id="2" onClick={makeChoice} disabled={show}>{choice2}</button>
    </div>
  )
}

export default Choice2