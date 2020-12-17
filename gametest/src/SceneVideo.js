import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';


const SceneVideo = (props) => {
    const client = props.client;
  const [scene, setScene] = useState([]);

  
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

    

  const renderSceneVideo = () => {
    return scene.map(({ video }, index) => (  
      <video autoPlay src={video} key={index} style={{ width: '1250px', height: 'auto'}} autoPlay></video>
    ))
  }



  return (

      <div id="video-window" >
        {renderSceneVideo()}
      </div>

  )
}

export default SceneVideo;