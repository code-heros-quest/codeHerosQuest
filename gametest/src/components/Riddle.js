import React, {useState} from 'react';
import client from './connect.js';

const Riddle = (props) => {
  const [answer, setAnswer] = useState('')

  const updateAnswer = (e) => {
    setAnswer(e.target.value);
  }

  const submitRiddle = (e) => {
    e.preventDefault();
    console.log(answer);
    let payload = { answer: answer , scenario: props.scenario }
    client.emit('riddle', payload);
  }
  
  return (
    <div>
      <form onSubmit={submitRiddle}>
        <input onChange={updateAnswer} type="text" placeholder="Enter your guess"/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Riddle
