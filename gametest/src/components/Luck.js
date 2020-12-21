import client from './connect.js';
import React, {useState} from 'react'
import './Luck.css';
import './Buttons.css';


function Luck(props) {
  let luckTag = '';
  const [tails, setTails] = useState('tails')
  const [heads, setHeads] = useState('heads')
  const [style, setStyle] = useState('choiceButtons');
  const [show, setShow] = useState('');
  
  function tossCoin(){  
    let count = (Math.floor(Math.random() * Math.floor(2)));
    if(count === 1){
        setHeads('animate-tails');
        setTails('animate-heads');
        setHeads('animate-heads');
        setTails('animate-tails');
        luckTag = 'You had poor luck';
        setStyle('disabled')
        setShow('false')
        setTimeout(() => {
          let payload = { luck: count , scenario: props.scenario }
          client.emit('luck', payload);

        }, 1500);
    }
    else{
      setHeads('animate-tails');
      setTails('animate-heads');
        luckTag = 'You had good luck';
        setStyle('disabled')
        setShow('false')
        setTimeout(() =>{ 
          let payload = { luck: count , scenario: props.scenario }
          client.emit('luck', payload);
        }, 1500);
      }
  }

  return (
    <div>
      <div className="container">
        <p>{luckTag}</p>
      </div>
      <div id="coin" style={{ margin: 'auto', position: 'absolute', marginLeft: '35%', marginTop: '50px'}}>
        <div className={heads} style={{backgroundImage: 'url(./images/heads.png)', height: '202px', width: '198px',}}/>
        <div className={tails} style={{backgroundImage: 'url(./images/tails.png)', height: '202px', width: '198px',}}/>
      </div>
        <button onClick={tossCoin} className={style} disabled={show}>Toss coin</button>
    </div>
  )
}

export default Luck;

