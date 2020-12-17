
import './App.css';
import React, {useState, useEffect} from 'react';
import Loot from './Loot.js';
import Chat from './Chat.js';
import Scenes from './Scenes.js';
import SceneVideo from './SceneVideo.js';
import { io, Socket } from 'socket.io-client';
import { left } from 'inquirer/lib/utils/readline';

const client = io.connect('http://localhost:3001', {transports: ['websocket']});
client.on('connect', () => {
  console.log('connected');
});

let count = 0; 
let sceneCount = 0;



function App() {
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
      <div style={{ display: 'block', display:'grid', gridTemplateColumns: '1fr', marginTop: '160px', width: '100%'}}>
      <div id='sceneWindow' style={{ display: 'inline-block', backgroundColor: 'white', width: '1250px', height: '700px', margin: 'auto'}}>
      <SceneVideo client={client}/>
      <Loot />
      </div>
      </div>
      <button  onClick={emitReady} style={{ display: 'block', margin: 'auto', marginTop: '10px'}} name="ready">Next Scene</button>
      
      <div style={{display: 'inline-block', margin: 'auto', marginLeft: '400px'}}>
      <Scenes client={client}/>
      </div>
       
      <div style={{display: 'inline-block', margin: 'auto', marginLeft: '400px'}}>
      <Chat client={client}/>
      </div>

    </>
  );
}

export default App;
