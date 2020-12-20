import React, {useState} from 'react';
import client from './connect.js';
import './Buttons.css';

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
    <div style={{ paddingTop: '5px'}}>
      <form onSubmit={submitRiddle}>
      <div style={{ padding: '10px 5px 5px 5px', borderRadius: '8px', border: '9px solid #945429', width: '50%', height: 'auto', margin: 'auto', backgroundImage: 'url(./images/textBox/text1.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
      <h5 style={{ color: 'black'}}>{props.scenario.choiceQuestion}</h5>
      </div>
        <input style={{borderRadius: '7px', padding: '5px 5px'}} onChange={updateAnswer} type="text" placeholder="Enter your guess"/>
        <button className='riddleButtons'>Submit</button>
      </form>
    </div>
  )
}

export default Riddle
