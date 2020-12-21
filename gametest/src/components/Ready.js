import React, { useState } from 'react';
import client from './connect.js';
import './Buttons.css';

const Ready = (props) => {
  const [show, setShow] = useState('');
  const [style, setStyle] = useState('choiceButtons');
  const [buttonText, setButtonText] = useState('Ready');

  const ready = () => {
    if (props.scenario.next) {
      let payload = props.scenario.next
      client.emit('ready', payload);
      setButtonText('Waiting for other players...');
      setShow('true');
      setStyle('disabled');
    }
  }

  return (
    <div>
      <button className={style} onClick={ready} id="ready" disabled={show}>{buttonText}</button>
    </div>
  )
}

export default Ready
