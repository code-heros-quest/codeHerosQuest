import React, {useState} from 'react';
import client from './connect.js';
import './Buttons.css';

const Start = (props) => {
  const [show, setShow] = useState('');
  const [style, setStyle] = useState('choiceButtons');

  const ready = () => {
      setShow('true');
      setStyle('disabled');
    if (props.scenario.next) {
      let payload = props.scenario.next
      client.emit('ready', payload);
    } else {
      client.emit('ready', 1);
    }
  }

  return (
    <div>
      <button  className={style} onClick={ready} id="ready" disabled={show}> Start </button>
    </div>
  )
}

export default Start