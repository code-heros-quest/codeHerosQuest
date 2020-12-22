import React, {useState} from 'react';
import client from './connect.js';
import './Buttons.css';

const Riddle = (props) => {
  const [answer, setAnswer] = useState('')
  const [buttonText, setButtonText] = useState('Submit');
  

  const updateAnswer = (e) => {
    setAnswer(e.target.value);
  }

  const submitRiddle = (e) => {
    e.preventDefault();
    console.log(answer);
    setButtonText('Waiting for other players...');
    let payload = { answer: answer , scenario: props.scenario }
    client.emit('riddle', payload);
  }
  
  
  return (
    <div style={{ paddingTop: '5px'}}>
      <form onSubmit={submitRiddle}>
      <div style={{ borderRadius: '8px', padding: '25px', backgroundImage: 'url(./images/choice.png)', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', objectFit: 'contain', overflow: 'auto' }}>
      <h5 style={{ color: 'black'}}>{props.scenario.choiceQuestion}</h5>
      </div>
        <input style={{borderRadius: '7px', padding: '5px 5px'}} onChange={updateAnswer} type="text" placeholder="Enter your guess"/>
        <button className='riddleButtons'>{buttonText}</button>
      </form>
    </div>
  )
}

export default Riddle
