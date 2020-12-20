import React, { useState } from 'react';
import client from './connect.js';
import './Buttons.css';

const Ready2 = (props) => {
  const [show, setShow] = useState('');
  const [style, setStyle] = useState('choiceButtons');
  const [buttonText, setButtonText] = useState('Ready');
  
  


  const ready = () => {
    if (props.scenario.next) {
      let payload = props.scenario.next
      client.emit('ready', payload);
      setShow('true');
      setStyle('disabled');
      setButtonText('Waiting for other players...');
    }
  }

  return (
    <div >
      <button className={style} onClick={ready} id="ready" disabled={show}>{buttonText}</button>
    </div>
  )
}

export default Ready2
