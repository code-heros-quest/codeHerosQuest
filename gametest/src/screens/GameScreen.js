
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
  const [characterState, setCharacterState] = useState({loot: [], stats: {health: 0, attack: 0}})

  useEffect(() => {
    client.emit('ready', 1);
  }, [])

  useEffect(() => {
    client.on('scenario', (scenario) => {
      setScenarioState(scenario);
      console.log('scenario updated - scenario')
    });
    client.on('result', result => {
      result.type = 'ready';
      setScenarioState(result);
      console.log('scenario updated - result')
    })
    client.on('single result', result => {
      result.type = 'none';
      setScenarioState(result);
    })
    client.on('game over', payload => {
      setCharacterState(payload);
      client.emit('end');
    })
  }, [setScenarioState]);

  useEffect(() => {
    client.on('character', charPayload => {
      setCharacterState(charPayload);
      console.log('char updated');
    })
  }, [setCharacterState]);

  // refactor passing client as props. Call it as an import
  // import client from '../components/connect.js';

  return (
    <div>
      <div style={{ textAlign: 'center'}}>
        <img src="./images/banner.png" alt="codeQuest" style={{ width: '40%'}}></img>
        <div id='sceneWindow' style={{ display: 'inline-block', backgroundColor: 'black', width: '60vw', minWidth: '750px', height: 'auto', margin: 'auto', objectFit: 'contain'}}>
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
