import React, { useState, useEffect } from 'react';
import Roll from './Roll';
import Choice2 from './Choice2';
import Choice3 from './Choice3';
import Ready from './Ready';
import Ready2 from './Ready2';
import Choice4 from './Choice4'
import Riddle from './Riddle'
import Luck from './Luck';
import Start from './Start';
import Luck3 from './Luck3';


let count = 0;

const GameButtons = (props) => {
  const [scenario, setScenario] = useState({})
  useEffect(() => {
    setScenario(props.scenario)
    count++;
    console.log(count);
  }, [props])
  console.log(scenario);
  switch (scenario.type) {
    case 'roll':
      return (
        <Roll scenario={scenario} />
      )
    case 'choice2':
      return (
        <Choice2 scenario={scenario} />
      )
    case 'choice3':
      return (
        <Choice3 scenario={scenario} />
      )
    case 'choice4':
      return (
        <Choice4 scenario={scenario} />
      )
    case 'riddle':
      return (
        <Riddle scenario={scenario} />
      )
    case 'ready':
      return (
        <Ready scenario={scenario} />
      )
    case 'ready2':
      return (
        <Ready2 scenario={scenario} />
      )
    case 'luck':
      return (
        <Luck scenario={scenario} />
      )
    case 'luck3':
      return (
        <Luck3 scenario={scenario} />
      )
    case 'none':
      return (
        <>
        </>
      )
    default:
      return (
        <Start scenario={scenario} />
      )
  }
}

export default GameButtons
