import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Scroll.css';



const Dialogue = (props) => {
  const [scene, setScene] = useState([])
  useEffect(() => {
    setScene([{ name: props.scenario.name, message: props.scenario.dialogue }])
    console.log('updating scene in dialogue from props')
  }, [props.scenario])



  const renderScene = () => {
    return scene.map(({ name, message }, index) => (
      <div key={index} style={{ height: '100%', width: 'auto', minWidth: '300px'}}>
        <h3 style={{ paddingTop: '20px', height: '15%', width: '100%', verticalAlign: 'bottom', marginLeft: 'auto', marginRight: 'auto', objectFit: 'contain', textAlign: 'center', fontFamily: 'fantasy', overflow: 'none'}}>
          {name}
        </h3>
        <div className='scrollDiv2' >
        {message}
        </div>
      </div>
    ))
  }



  return (

      <div id="dialogue-window"  style={{backgroundImage: 'url(./images/textBox/text2.png)'}}>
        {renderScene()}
      </div>

  )
}

export default Dialogue;