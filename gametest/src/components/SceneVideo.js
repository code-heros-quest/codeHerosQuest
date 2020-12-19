import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';


const SceneVideo = (props) => {
  const [scene, setScene] = useState([]);

  useEffect(() => {
    setScene([{ video: props.scenario.video }])
  }, [props])
    

  const renderSceneVideo = () => {
    return scene.map(({ video }, index) => ( 
     <iframe autoPlay src={video} key={index} style={{ width: '1250px', height: '750px', border: 'none'}} controls></iframe>
    ))
  }



  return (

      <div id="video-window" >
        {renderSceneVideo()}
      </div>

  )
}

export default SceneVideo;