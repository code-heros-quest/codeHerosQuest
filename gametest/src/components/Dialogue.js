import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dialogue.css';



const Dialogue = (props) => {
  const [scene, setScene] = useState([])
  useEffect(() => {
    setScene([{ name: props.scenario.name, message: props.scenario.dialogue }])
  }, [props])



  const renderScene = () => {
    return scene.map(({ name, message }, index) => (
      <div key={index} style={{ height: '20px', width: 'auto'}}>
        <h3 style={{ paddingTop: '20px', height: 'auto', width: '400px', verticalAlign: 'bottom', marginLeft: 'auto', marginRight: 'auto', fontSize: '1.6em', objectFit: 'contain', textAlign: 'center', fontFamily: 'fantasy', overflow: 'none'}}>
          {name}
        </h3>
        <div className='scrollDiv' >
        {message}
        </div>
      </div>
    ))
  }



  return (

      <div id="dialogue-window" style={{ backgroundImage: 'url(./images/textBox/text2.png)', backgroundSize: '100% 100%', borderRadius: '10px', fontSize: '1.7em', color: 'black', display: 'inline-block', width: '778px', minHeight: '510px', height: 'auto', border: '6px solid black', padding: '5px 10px 10px 10px'}}>
        {renderScene()}
      </div>

  )
}

export default Dialogue;