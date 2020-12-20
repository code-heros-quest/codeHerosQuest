import client from './connect.js';
import React, {useState} from 'react'
import './Luck.css';
import './Buttons.css';


function Luck(props) {
  let luckTag = '';
  const [tails, setTails] = useState('tails')
  const [heads, setHeads] = useState('heads')

  
  function tossCoin(){  
    let count = (Math.floor(Math.random() * Math.floor(2)));
    if(count === 1){
        setHeads('animate-tails');
        setTails('animate-heads');
        luckTag = 'You had poor luck';
        let payload = { luck: count , scenario: props.scenario }
        client.emit('luck', payload);
    }
    else{
        setHeads('animate-heads');
        setTails('animate-tails');
        luckTag = 'You had good luck';
        let payload = { luck: count , scenario: props.scenario }
        client.emit('luck', payload);
      }
  }

  return (
    <div>
      <div className="container">
        <p>{luckTag}</p>
      </div>
      <div id="coin" style={{ margin: 'auto', position: 'absolute'}}>
        <div className={heads} style={{backgroundImage: 'url(./images/heads.png)', height: '202px', width: '198px',}}/>
        <div className={tails} style={{backgroundImage: 'url(./images/tails.png)', height: '202px', width: '198px',}}/>
      </div>
        <button onClick={tossCoin} className='choiceButtons'>Toss coin</button>
    </div>
  )
}

export default Luck;

