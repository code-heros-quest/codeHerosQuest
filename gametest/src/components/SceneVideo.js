import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';


const SceneVideo = (props) => {
  const [scene, setScene] = useState([{ video: null }]);

  useEffect(() => {
    setScene([{ video: props.scenario.video }])
    console.log('updating video in scene vid from props')
  }, [props.scenario])


  const renderSceneVideo = () => {
    if (props.scenario.number === 1) {
      return scene.map(({ video }, index) => (
        // <iframe autoPlay src={video} key={index} style={{ width: '100%', minwidth: '700px',  minHeight: '525px', height: '100%', border: 'none' }} autoPlay></iframe>
        <video src={video} autoplay ></video>
      ))
    } else {
      return scene.map(({ video }, index) => (
        <img src={video} key={index} style={{ width: 'auto', minWidth: 'auto', height: '525px', minHeight: '525px', border: '5px solid black', border: '5px solid black' }}></img>
      ))
    }
  }



  return (

    <div id="video-window" >
      {renderSceneVideo()}
    </div>

  )
}

export default SceneVideo;