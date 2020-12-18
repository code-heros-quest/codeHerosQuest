
import '../App.css';
import React, {useState, useEffect} from 'react';
import SceneVideo from '../components/SceneVideo.js';
import Loot from '../components/Loot.js';
import Dialogue from '../components/Dialogue.js';
import Chat from '../components/Chat.js';
import client from '../components/connect.js';
import GameButtons from '../components/GameButtons';


function GameScreen() {
  const [scenarioState, setScenarioState] = useState({})

  useEffect(() => {
    client.on('scenario', (scenario) => {
      setScenarioState(scenario);
    });
    client.on('result', result => {
      result.type = 'ready';
      setScenarioState(result);
    })
    
  })

  // refactor passing client as props. Call it as an import
  // import client from '../components/connect.js';

  return (
    <>
      {/* <div style={{  display: 'block', textAlign: 'center'}}>
        <div id='sceneWindow' style={{ display: 'inline-block', backgroundColor: 'black', width: '1250px', height: 'auto', margin: 'auto'}}>
          <SceneVideo client={client}/>
        </div>
        <div style={{ display: 'inline-block', paddingLeft: '20px'}}>
          <Loot />
        </div>
      </div> */}
      <GameButtons scenario={scenarioState} />
      {/* <button  onClick={emitReady} style={{ display: 'block', margin: 'auto', marginTop: '10px'}} name="ready">Next Scene</button> */}
      {/* <section style={{ display: 'grid', gridTemplateRows: '1fr', gridTemplateColumns: '1fr 1fr', margin: 'auto'}}> */}
        <div style={{ textAlign: 'right'}}>
          <Dialogue scenario={scenarioState}/>
        </div>
        {/* <div style={{ marginLeft: '0', paddingLeft: '50px'}}>
          <Chat client={client}/>
        </div> */}
      {/* </section> */}
      
    </>
  );
}

export default GameScreen;
