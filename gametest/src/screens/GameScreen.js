
import '../App.css';
import React, {useState, useEffect} from 'react';
import SceneVideo from '../components/SceneVideo.js';
import Loot from '../components/Loot.js';
import Dialogue from '../components/Dialogue.js';
import Chat from '../components/Chat.js';
import client from '../components/connect.js';

let count = 0; 
let sceneCount = 0;



function GameScreen() {
  const welcome = <h1 style={{ color: 'gray'}}>Click next to start the game!</h1>
  const [scene, setScene] = useState(welcome);

  client.on('scenario', (scenario) => {
    setScene([{ video: scenario.video }])
    switch(scenario.type) {
      case 'roll':
        // code block
        break;
      case 'choice2':
        // code block
        break;
      case 'choice3':
        // code block
        break;
      case 'choice4':
        // code block
        break;
      case 'riddle':
        // code block
        break;
      case 'ready':

        // code block
        break;
      case 'luck':
        // code block
        break;
      default:
        // code block
    }
  });

  function emitReady(){
    sceneCount++;
    client.emit('ready', sceneCount);
    alert('ready');
  }

  

  return (
    <>
      <div style={{  display: 'block', textAlign: 'center'}}>
      <div id='sceneWindow' style={{ display: 'inline-block', backgroundColor: 'black', width: '1250px', height: 'auto', margin: 'auto'}}>
      <SceneVideo client={client}/>
      </div>
      <div style={{ display: 'inline-block', paddingLeft: '20px'}}>
      <Loot />
      </div>
      </div>
      <button  onClick={emitReady} style={{ display: 'block', margin: 'auto', marginTop: '10px'}} name="ready">Next Scene</button>
      <section style={{ display: 'grid', gridTemplateRows: '1fr', gridTemplateColumns: '1fr 1fr', margin: 'auto'}}>
      <div style={{ textAlign: 'right'}}><Dialogue client={client}/></div>
      <div style={{ marginLeft: '0', paddingLeft: '50px'}}><Chat client={client}/></div>
      </section>
    </>
  );
}

export default GameScreen;
