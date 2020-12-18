import React from 'react';
import client from './connect.js';

const Riddle = (props) => {

  const submitRiddle = (e) => {
    let answer = e.target.value;
    let payload = { answer , scenario: props.scenario }
    client.emit('riddle', payload);
  }
  
  return (
    <div>
      <form onSubmit={submitRiddle}>
        <input type="text" placeholder="Enter your guess"/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Riddle
