
import '../App.css';
import React, {useState, useEffect} from 'react';
import SceneVideo from '../components/SceneVideo.js';
import Loot from '../components/Loot.js';
import Dialogue from '../components/Dialogue.js';
import Chat from '../components/Chat.js';
import client from '../components/connect.js';
import GameButtons from '../components/GameButtons';
import './GameScreen.css';

function GameScreen() {
  const [scenarioState, setScenarioState] = useState({})
  const [characterState, setCharacterState] = useState({})

  useEffect(() => {
    client.on('scenario', (scenario) => {
      setScenarioState(scenario);
    });
    client.on('result', result => {
      result.type = 'ready';
      setScenarioState(result);
    })
    client.on('single result', result => {
      result.type = 'none';
      setScenarioState(result);
    })
    client.on('character', charPayload => {
      setCharacterState(charPayload);
      console.log('char', charPayload);
    })
  })

  // refactor passing client as props. Call it as an import
  // import client from '../components/connect.js';

  return (
    <div id='screen'>
      <div>
        <header>
        <img src="./images/banner.png" alt="codeQuest" style={{ width: '40%'}}></img>
        </header>
        <div id='sceneWindow' >
          <SceneVideo scenario={scenarioState}/>
        </div>
          <div style={{display: 'inline-block', paddingLeft: '40px'}}>
          <Loot character={characterState}/>
          </div>
      <div id='gameButtons' style={{ textAlign: 'center', verticalAlign: 'middle', paddingBottom: '20px'}}>
      <GameButtons scenario={scenarioState} />
      </div>
      </div>
      <section id='dc-container'>
        <div id='dialogue'>
          <Dialogue scenario={scenarioState}/>
        </div>
        <div id='chat'>
          <Chat character={characterState}/>
        </div>
      </section>
      
    </div>
  );
}

export default GameScreen;
