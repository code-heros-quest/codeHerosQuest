import React, {useState} from 'react';
import client from './connect.js';
import './Buttons.css';

const Ready = (props) => {
  const [show, setShow] = useState('');
  const [style, setStyle] = useState('choiceButtons');

  const ready = () => {
    if (props.scenario.next) {
      let payload = props.scenario.next
      client.emit('ready', payload);
      setShow('true');
      setStyle('disabled');
    } 
  }

  return (
    <div>
      <button className={style} onClick={ready} id="ready" disabled={show}> Ready </button>
    </div>
  )
}

export default Ready
