'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http);
require('dotenv').config();
let PORT = process.env.PORT


const char = require('./characters.js');
const loot = require('./loot.js');
const scenario = require('./scenario.js');


let responseCount = 0;
let counter = 0;
let tempArr = [];
let choiceArr = [];
let playerCount = 0;
let riddleCount = 0;



io.on('connection', (socket) => {
  socket.on('chat', function (data) {
    io.sockets.emit('chat', data);
  });

  // Handle typing event - not currently live
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });

  counter++;
  console.log(counter);
  if (counter === 4) {
    console.log(`all players have connected`);
    io.emit('scenario', scenario.intro)
    // io.emit('theKingIntro', scenario.theKingIntro);
  }
  socket.on('ready', next => {
      console.log(next)
    readyStatus(true, 'scenario', next);
  })
  socket.on('roll', payload => {
    // payload will have .scenario and .roll whcih will be that players roll
    // will emit a result with the rollResult attached
    rollEvaluator(payload);
  })
  socket.on('riddle', payload => {
    // payload will have .scenario and .answer which is their answer to the riddle, and .char with hunter/assasin/warr/or wizard so I can evaluate for individual rewards
    // if they get their answer correct we will emit a single player response
    // the choice will be determined on the total number of players to answer correctly
    riddleEvaluator(payload);
  })
  socket.on('choice', payload => {
    // payload.vote, payload.scenario
    // payload that has the scenario, AND that players vote
    // if we get three votes for one choice it wins, we serve back the dialogue for that choice
    // if we gwt a tie it is random?
    // write a function that takes in the votes, count votes, once we get four it emits the 'result' payload of the scenario.choices.choice1/2/3/4
    // payload = {
    //   vote: 1,
    //   scenario: scenario.atTheWall
    // }
    choiceVote(payload)
  })

  socket.on('luck', payload => {
    // payload will have .scenario and .luck whcih will 0 or 1 depending on that players luck
    // will emit a result with the luckResult attached
    luckEvaluator(payload);
  })






  //------------------ READY FUNCTION ----------------//
  function readyStatus(result, emitStr, scenarioNum) {
    
    if (result) {
      responseCount++;
    }
    if (responseCount === 4) {
      let scenario = nextScenario(scenarioNum);
      io.emit(emitStr, scenario);
      console.log(emitStr, 'emitStr');
      console.log(scenario, 'scenario');
      console.log('response count has reached 4');
      responseCount = 0;
    }
  }




  // ------------------ CHOICE SCENARIOS ----------------//

  //expecting votes and scenario form paylod of socket.on 'choice'
  function choiceVote(result) {
    console.log('in the function')
    tempArr.push(result.vote);
    let ch1 = 0;
    let ch2 = 0;
    let ch3 = 0;

    if (tempArr.length === 4) {
      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i] === 1) {
          ch1++
        } else if (tempArr[i] === 2) {
          ch2++
        } else if (tempArr[i] === 3) {
          ch3++
        }
      }
      if (ch1 > ch2 && ch1 > ch3) {
        var choice = result.scenario.choices.choice1
      }
      else if (ch2 > ch1 && ch2 > ch3) {
        var choice = result.scenario.choices.choice2
      }
      else if (ch3 > ch2 && ch3 > ch1) {
        var choice = result.scenario.choices.choice3
      }
      else {
        let random = tempArr[Math.floor(Math.random() * tempArr.length)]
        if (random === 1) {
          var choice = result.scenario.choices.choice1
        }
        if (random === 2) {
          var choice = result.scenario.choices.choice2
        }
        if (random === 3) {
          var choice = result.scenario.choices.choice3
        }
      }
      //console.log(choice)
      tempArr = [];
      io.emit(`result`, choice)
    }

  }

  // ---------- riddle eval ------------- //
  function riddleEvaluator(payload) {
    playerCount++
    let possibleLoot = payload.scenario.choices.riddle2.lootObject;
    let answerArray = payload.scenario.choices.riddle2.correct;
    let correctDialogue = payload.scenario.choices.riddle2.dialogue;
    let incorrectDialogue = payload.scenario.choices.riddle1.dialogue;
    if (answerArray.includes(payload.answer.toLowerCase())) {
      socket.emit('singleResult', correctDialogue);
      evaluateForLootRiddle(possibleLoot, payload);
      count++
    } else {
      socket.emit('singleResult', incorrectDialogue);
    }
    if (playerCount === 4) {
      if (count >= 2) {
        socket.emit('result', payload.scenario.choices.riddle4);
        evaluateForLoot(payload.scenario.choices.riddle4.lootObject);
      } else {
        socket.emit('result', payload.scenario.choices.riddle3);
      }
      count = 0;
      playerCount = 0;
    }

    // add singleResult listener on client side
  }

  // ---------- LUCK Evaluator ------------- //
  function luckEvaluator(payload) {
    responseCount++;
    count += payload.luck;
    if (responseCount === 4) {
      let result = {}
      if (count >= 2) {
        result = payload.scenario.choices.goodLuck;
      } else {
        result = payload.scenario.choices.badLuck;
      }
      evaluateForLoot(result.lootObject);
      io.emit('result', result);
      count = 0;
      responseCount = 0;
    }
  }



  // ---------- NEW Dice Roll ------------//
  function rollEvaluator(payload) {
    responseCount++;
    count += payload.roll;
    if (responseCount === 4) {
      let stats = currentStats();
      let extraRoll = percentageEvaluator(stats, payload);
      count += extraRoll;
      let rollResult = {};
      if (count >= 20) {
        rollResult = payload.scenario.choices.highRoll;
      } else if (count >= 10) {
        rollResult = payload.scenario.choices.medRoll;
      } else {
        rollResult = payload.scenario.choices.lowRoll;
      }
      affectForHealth(rollResult.damage);
      evaluateForLoot(rollResult.lootObject);
      io.emit('result', rollResult);
      count = 0;
      responseCount = 0;
      // add damage to each roll, add attackEval obj to each roll result
    }

  }

  // ------------- Helper functions -------------//

  function currentStats() {
    let statObj = { health: 0, attack: 0 };
    for (const character in char) {
      statObj.health += char[character].stats.health;
      statObj.attack += char[character].stats.attack;
    }
    console.log(statObj);
    return statObj;
  }

  function evaluateForLoot(lootArray) {
    if (lootArray !== null) {
      console.log('evaluating for loot');
      for (const character in char) {
        console.log(char[character])
        lootArray.forEach(loot => char[character].activateLoot(loot));
        console.log(char[character])
      }
    }
  }

  function evaluateForLootRiddle(lootArray, payload) {
    if (lootArray !== null) {
      console.log('evaluating for riddle loot');
      for (const character in char) {
        if (char[character].charClass === payload.char) {
          console.log(char[character])
          lootArray.forEach(loot => char[character].activateLoot(loot));
          console.log(char[character])
        }
      }
    }
  }

  function affectForHealth(value) {
    console.log('affecting char health');
    for (const character in char) {
      console.log(char[character])
      char[character].loseHealth(value)
      if (char[character].stats.health < 1) {
        gameOver(scenario.gameOverDeath);
      }
      console.log(char[character])
    }
  }

  function nextScenario(num) {
    for (const event in scenario) {
      if (scenario[event].number === num) {
        return scenario[event];
      }
    }
  }

  function percentageEvaluator(stats, payload) {
    let baseNumber = stats.attack - payload.scenario.choices.rollPotential.low;
    let totalNumber = payload.scenario.choices.rollPotential.high - payload.scenario.choices.rollPotential.low;
    let percentage = baseNumber / totalNumber;
    let extraRoll = 0;
    if (percentage > .6) {
      extraRoll = 6;
    } else if (percentage > .3) {
      extraRoll = 3;
    } else {
      extraRoll = 1;
    }
    return extraRoll;

  }

  // ----------- disconnect functions ---------- //
  // add client side game over listener?

  function gameOver(scenario) {
    let stats = currentStats();
    console.log(stats.health);
    io.emit('gameOver', scenario);
    socket.disconnect();
  }

  function gameOverHydra() {
    let stats = currentStats();
    console.log(stats.health);
    if (stats.health < 40) {
      io.emit('gameOver', scenario.gameOverHydra);
      socket.disconnect();
    }
  }


})


 __dirname = path.resolve()

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/backend/server.js')))
  
  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, 'gametest', 'build', 'index.html'))
  )
} 



// App setup
http.listen(PORT, function () {
  console.log(`listening for requests on port ${PORT}`);
});


// module.exports = {
//   hunter: char.hunter, 
//   wizard: char.wizard,
//   warrior: char.warrior,
//   assassin: char.assassin
// }
















