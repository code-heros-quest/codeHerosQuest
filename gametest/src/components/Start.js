import React from 'react';
import client from './connect.js';

const Start = (props) => {

  const ready = () => {
    if (props.scenario.next) {
      let payload = props.scenario.next
      client.emit('ready', payload);
    } else {
      client.emit('ready', 1);
    }
  }

  return (
    <div>
      <button onClick={ready} id="ready"> Start </button>
    </div>
  )
}

export default Start