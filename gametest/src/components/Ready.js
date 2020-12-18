import React from 'react';
import client from './connect.js';

const Ready = (props) => {

  const ready = () => {
    if (props.scenario.next) {
      let payload = props.scenario.next
      client.emit('ready', payload);
    } 
  }

  return (
    <div>
      <button onClick={ready} id="ready"> Ready </button>
    </div>
  )
}

export default Ready
