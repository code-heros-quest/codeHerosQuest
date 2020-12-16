import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';


const client = io.connect('http://localhost:3001', {transports: ['websocket']});
client.on('connect', () => {
  console.log('connected');
});

const Scenes = () => {
  const [scene, setScene] = useState([]);

  
    client.on('scenario', (scenario) => {
      setScene([...scene, { name: scenario.name, message: scenario.dialogue }])
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

    

  const renderScene = () => {
    return scene.map(({ name, message }, index) => (
      <div key={index}>
        <h3 style={{display: 'block', textAlign: 'center', textDecoration: 'underline'}}>
          {name}
        </h3>
        <span style={{ width: '650px', height: 'auto'}}>{message}</span>
      </div>
    ))
  }


  return (

      <div id="dialogue-window" style={{ backgroundColor: 'lightgray', borderRadius: '10px', fontSize: '1.7em', color: 'black', display: 'inline-block', width: '750px', minHeight: '500px', height: 'auto', border: '6px solid black', padding: '5px 10px 10px 10px'}}>
        {renderScene()}
      </div>

  )
}

export default Scenes;