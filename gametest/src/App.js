
import './App.css';
import React, {useState, useEffect} from 'react';
import Loot from './Loot.js';
import Chat from './Chat.js';
import Scenes from './Scenes.js';
import { io, Socket } from 'socket.io-client';

const client = io.connect('http://localhost:3001', {transports: ['websocket']});
client.on('connect', () => {
  console.log('connected');
});

let count = 0; 
let sceneCount = 1;



function App() {
  const welcome = <h1 style={{ color: 'gray'}}>Welcome to Code Quest. Press the next scene to start the game. Good luck on your journey.</h1>
  // const intro = <video autoPlay src='./Videos/CodeQuestIntro.mp4' placeholder="./images/axe.png" style={{ width: '100%', height: '700px'}} ></video>
  const [scene, setScene] = useState(welcome);


  function emitReady(){
    sceneCount++;
    client.emit('ready', sceneCount);
    alert('ready');
  }

  // function changeScene(){

  //   if(count === 0){
  //     count++;
  //     let title = Scenarios.intro.name;
  //     let intro = Scenarios.intro.dialogue;
  //     return setScene(intro)
  //   }
  //   if(count === 1){
  //     const scene1 = <video controls autoPlay src='./Videos/scene1.mp4' style={{ width: '100%', height: 'auto'}} ></video>
  //     count++;
  //    return setScene(scene1);
  //   }
  //   if(count === 2){
  //     const scene2 = <video autoPlay src='./Videos/swamp.mp4' style={{ width: '100%', height: 'auto'}} ></video>
  //     count++;
  //     return setScene(scene2);
  //   }
  // }

  

  return (
    <>
        <section style={{ display:'grid', gridTemplateColumns: '4fr 1fr'}}>
        <div id='sceneWindow' style={{ backgroundColor: 'black', width: '1250px', height: '700px', margin: 'auto', alignSelf: 'center'}}>
        <div style={{ display: 'inline-block'}}>
        {scene}
        </div>
        </div>
        <Loot/>
        </section>
      <button  onClick={emitReady} style={{ display: 'block', margin: 'auto', marginTop: '10px'}} name="ready">Next Scene</button>
      <div style={{display: 'inline-block', margin: 'auto', marginLeft: '400px'}}>
      <Scenes/>

      </div>
        <div style={{display: 'inline-block', margin: 'auto', marginLeft: '400px'}}>
       <Chat/>

        </div>

    </>
  );
}

export default App;
