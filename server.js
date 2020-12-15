'use strict';

var express = require('express');
var app = express();
const http = require('http').createServer(app)
var io = require('socket.io')(http);
require('dotenv').config();
let PORT = process.env.PORT








const char = require('./characters.js');
const loot = require('./loot.js');
const scenario = require('./scenario.js');


let readyCount = 0;
let counter = 0;
let tempArr = [];
let choiceArr = [];
let playerCount = 0;
let riddleCount = 0;

io.on('connection', (socket) =>{
  socket.on('chat', function (data) {
    // console.log(data);
    io.sockets.emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });
  
  counter++;
  console.log(counter);
  if(counter === 4){
  console.log(`all players have connected`);
  io.emit('intro', scenario.intro)
  // io.emit('theKingIntro', scenario.theKingIntro);
  }
  
  socket.on('introReady', ready => {
    readyStatus(ready, 'atTheWall', scenario.atTheWall);
  })

  socket.on('atTheWallChoice', choices => {
    console.log('I am in atTheWallChoice');
    choiceVote(choices, 'atTheWallChosen', scenario.theOrcLord, scenario.theWoodsman, null)

  })
  socket.on('theWoodsmanRoll', rolls => {
    dicePickLuck(8, 16, 0, 0, 0, rolls, 'theWoodsManResult', scenario.theWoodsman.choices.lowRoll, scenario.theWoodsman.choices.medRoll, scenario.theWoodsman.choices.highRoll);
  })
  socket.on('theWoodsmanReady', ready => {
    readyStatus(ready, 'theVillage', scenario.theVillage)
  })
  socket.on('theOrcLordRoll', rolls => {
    console.log('evaluating orc lord roll');
    dicePick(58, 66, 10, 5, 0, rolls, 'theOrcLordResult', scenario.theOrcLord.choices.lowRoll, scenario.theOrcLord.choices.medRoll, scenario.theOrcLord.choices.highRoll)
  })
  socket.on('theOrcLordReady', ready => {
    readyStatus(ready, 'theOldFriend', scenario.theOldFriend);
  })
  socket.on('theOldFriendReady', ready => {
    readyStatus(ready, 'theVillage', scenario.theVillage);
  })
  socket.on('theVillageChoice', choices => {
    choiceVote(choices, 'theVillageChosen', scenario.theGoblin, scenario.thePoinsonousBite, null)
  })
  socket.on('theGoblinRoll', rolls => {
    dicePick(58, 66, 10, 5, 0, rolls, 'theGoblinResult', scenario.theGoblin.choices.lowRoll, scenario.theGoblin.choices.medRoll, scenario.theGoblin.choices.highRoll)
  })
  socket.on('theGoblinReady', ready => {
    readyStatus(ready, 'theTroll', scenario.theTroll);
  })
  socket.on('thePoisonousBiteReady', ready => {
    affectForHealth(1);
    readyStatus(ready, 'theTroll', scenario.theTroll);
  })
  socket.on('theTrollRoll', rolls => {
    dicePick(58, 66, 10, 5, 0, rolls, 'theTrollResult', scenario.theTroll.choices.lowRoll, scenario.theTroll.choices.medRoll, scenario.theTroll.choices.highRoll)
  })
  socket.on('theTrollReady', ready => {
    readyStatus(ready, 'theMerchant', scenario.theMerchant);
  })
  socket.on('theMerchantRiddle', payload => {
    riddleCount += riddleEvaluator(payload, scenario.theMerchant.choices, 'theMerchantRiddleAnswer')
    if (playerCount === 4) {
      if (riddleCount >= 2) {
        io.emit('theMerchantResults', scenario.theMerchant.choices.choice4);
      } else {
        io.emit('theMerchantResults', scenario.theMerchant.choices.choice3);
      }
      playerCount = 0;
      riddleCount = 0;
    }
  })
  socket.on('theMerchantReady', ready => {
    readyStatus(ready, 'theWitch', scenario.theWitch);
  })
  socket.on('theWitchRiddle', payload => {
    riddleCount += riddleEvaluator(payload, scenario.theWitch.choices, 'theWitchRiddleAnswer')
    if (playerCount === 4) {
      if (riddleCount > 2) {
        io.emit('theWitchResults', scenario.theWitch.choices.choice4);
        char.wizard.activateLoot(loot.gnarledStaff);
      } else {
        io.emit('theWitchResults', scenario.theWitch.choices.choice3);
      }
      playerCount = 0;
      riddleCount = 0;
    }
  })
  socket.on('theWitchReady', ready => {
    readyStatus(ready, 'theHydra', scenario.theHydra);
  })
  socket.on('theHydraRoll', rolls => {
    dicePick(64, 78, 20, 9, 5, rolls, 'theHydraResult', scenario.theHydra.choices.lowRoll, scenario.theHydra.choices.medRoll, scenario.theHydra.choices.highRoll)
  })
  socket.on('theHydraReady', ready => {
    gameOverHydra();
    readyStatus(ready, 'rebellion', scenario.rebellion);
  })
  socket.on('rebellionRoll', rolls => {
    dicePickLuck(8, 16, 0, 0, 0, rolls, 'rebellionResult', scenario.rebellion.choices.lowRoll, scenario.rebellion.choices.medRoll, scenario.rebellion.choices.highRoll);
  })
  socket.on('rebellionReady', ready => {
    readyStatus(ready, 'cityAroundThePalace', scenario.cityAroundThePalace);
  })
  socket.on('cityAroundThePalaceChoice', choices => {
    choiceVote(choices, 'cityAroundThePalaceChosen', scenario.cityAroundThePalace.choices.choice1, scenario.cityAroundThePalace.choices.choice2, scenario.cityAroundThePalace.choices.choice3)
  })
  socket.on('cityAroundThePalaceReady', ready => {
    readyStatus(ready, 'hornedAnimal', scenario.hornedAnimal);
  })
  socket.on('hornedAnimalReady', ready => {
    readyStatus(ready, 'mageSmith', scenario.mageSmith);
  })
  socket.on('mageSmithChoice', choices => {
    choiceVote(choices, 'mageSmithChosen', scenario.mageSmith.choices.choice1, scenario.mageSmith.choices.choice2, scenario.mageSmith.choices.choice3)
  })
  socket.on('mageSmithReady', ready => {
    readyStatus(ready, 'theKingIntro', scenario.theKingIntro);
  })
  socket.on('theKingIntroReady', ready => {
    readyStatus(ready, 'theKing1', scenario.theKing1);
  })
  socket.on('theKing1Riddle', payload => {
    riddleCount += riddleEvaluator(payload, scenario.theKing1.choices, 'theKing1RiddleAnswer')
    console.log(riddleCount);
    if (playerCount === 4) {
      if (riddleCount > 2) {
        io.emit('theKing1Results', scenario.theKing1.choices.choice4);
      } else {
        io.emit('theKing1Results', scenario.theKing1.choices.choice3);
        gameOver(scenario.gameOverKing);
      }
      playerCount = 0;
      riddleCount = 0;
    }
  })
  socket.on('theKing1Ready', ready => {
    readyStatus(ready, 'theKing2', scenario.theKing2);
  })
  socket.on('theKing2Roll', rolls => {
    dicePickKing(rolls, 'theKing2Result', scenario.theKing2.choices.lowRoll, scenario.theKing2.choices.highRoll);
  })
  socket.on('theKing2Ready', ready => {
    readyStatus(ready, 'theKing3', scenario.theKing3);
  })
  socket.on('theKing3Roll', rolls => {
    dicePickLuck(8, 16, 0, 0, 0, rolls, 'theKing3Result', scenario.theKing3.choices.lowRoll, scenario.theKing3.choices.medRoll, scenario.theKing3.choices.highRoll)
  });
  socket.on('theKing3Ready', ready => {
    gameOver(scenario.gameOverWin);
  });


  



  //------------------ READY FUNCTION ----------------//
  function readyStatus (result, emitStr, scenario) { 
    if(result){
      readyCount++;
    }
    if(readyCount === 4){
      io.emit(emitStr, scenario);
      console.log('ready count has reached 4');
      readyCount = 0;
    }
    else{
      console.log(readyCount, ' is the count');
    }        
  }

    

    
  // ------------------ CHOICE SCENARIOS ----------------//
  function choiceVote(result, emitStr, choice1, choice2, choice3) {
    tempArr.push(result);
  let ch1 = 0;
  let ch2 = 0;
  let ch3 = 0;
  
    if (tempArr.length === 4){
      for (let i = 0; i < tempArr.length; i++){
      if (tempArr[i].num === 1) {
        ch1++
      } else if (tempArr[i].num === 2) {
        ch2++
      } else if (tempArr[i].num === 3) {
        ch3++
      }
      } if(ch1 > ch2 && ch1 > ch3){
        io.emit(emitStr, choice1);
        tempArr = [];
      } else if(ch2 > ch1 && ch2 > ch3){
        io.emit(emitStr, choice2);
        tempArr = [];
      } else if (ch3 > ch2 && ch3 > ch1){
        io.emit(emitStr, choice3);
        tempArr = [];
      }
      else {
        let randChoice = [null, choice1, choice2, choice3];
        let answer = Math.floor(Math.random() * (tempArr.length - 1) + 1);
        io.emit(emitStr, randChoice[answer]);
        tempArr = [];
      }
    
    } 
  }

  // ---------- individual riddle eval ------------- //
  function riddleEvaluator(payload, scenario, emitStr) {
    playerCount++
    let possibleLoot = scenario.choice2.lootObject;
    let answerArray = scenario.choice2.choiceName;
    let correctDialogue = scenario.choice2.dialogue;
    let incorrectDialogue = scenario.choice1.dialogue;
    if (answerArray.includes(payload.answer.toLowerCase())) {
      socket.emit(emitStr, correctDialogue);
      console.log(payload);
      if(answerArray[0] !== 'nothing') {
        evaluateForLootRiddle(possibleLoot, payload);
      }
      return 1;
    } else {
      socket.emit(emitStr, incorrectDialogue);
      return 0;
    }
  }

   // ---------- DICE PICK FOR LUCK ------------- //

  
  
   function dicePickLuck(low, med, dam1, dam2, dam3, result, emitStr, choice1, choice2, choice3){
    console.log('in Dice Pick for luck');
    console.log('I am the result ' + result);
    playerCount++;
    choiceArr.push(result);
    let count = 0;
    console.log(choiceArr);
    if(playerCount === 4){
      console.log('this how many rolls', playerCount);
      for (let i = 0; i < choiceArr.length; i++){
        count += parseInt(choiceArr[i]);     
      }
      console.log(count);
      if(count <= low){
        console.log(count, ' <= ', low)
        console.log('bad roll');
        io.emit(emitStr, choice1)
        affectForHealth(dam1);
        if (choice1.lootObject) {
          evaluateForLoot(choice1.lootObject);
        }
        choiceArr =[]
        playerCount = 0;
        } 
        else if(count > low && count <= med){
          console.log(count, ' > ', low, ' && ', count, ' <= ', med)
          console.log('med roll');
          io.emit(emitStr, choice2)
          affectForHealth(dam2);
          if (choice2.lootObject) {
            evaluateForLoot(choice2.lootObject);
          }
          choiceArr =[]
          playerCount = 0;
        }
        else if(count > med) {
          console.log(count, ' > ', med);
          console.log('good roll');
          io.emit(emitStr, choice3);
          affectForHealth(dam3);
          if (choice3.lootObject) {
            evaluateForLoot(choice3.lootObject);
          }
          choiceArr =[]
          playerCount = 0;
        }
        else {
          io.emit(emitStr, choice2);
          affectForHealth(dam2);
          if (choice2.lootObject) {
            evaluateForLoot(choice2.lootObject);
          }
          choiceArr =[]
          playerCount = 0;
        } 
    }
  }
  // ---------- DICE PICK ------------- //
  
  function dicePick(low, med, dam1, dam2, dam3, result, emitStr, choice1, choice2, choice3){
    let stats = currentStats();
    console.log('in dice pick');
    console.log('I am the result ' + result);
    playerCount++;
    choiceArr.push(result);
    let count = 0;
    console.log(choiceArr);
    if(playerCount === 4){
      console.log('this how many rolls', playerCount);
      for (let i = 0; i < choiceArr.length; i++){
        count += parseInt(choiceArr[i]);     
      }
      count += stats.attack;
      console.log(count);
      if(count <= low){
        console.log(count, ' <= ', low)
        console.log('bad roll');
        io.emit(emitStr, choice1)
        affectForHealth(dam1);
        if (choice1.lootObject) {
          evaluateForLoot(choice1.lootObject);
        }
        choiceArr =[]
        playerCount = 0;
        } 
        else if(count > low && count <= med){
          console.log(count, ' > ', low, ' && ', count, ' <= ', med)
          console.log('med roll');
          io.emit(emitStr, choice2)
          affectForHealth(dam2);
          if (choice2.lootObject) {
            evaluateForLoot(choice2.lootObject);
          }
          choiceArr =[]
          playerCount = 0;
        }
        else if(count > med) {
          console.log(count, ' > ', med);
          console.log('good roll');
          io.emit(emitStr, choice3);
          affectForHealth(dam3);
          if (choice3.lootObject) {
            evaluateForLoot(choice3.lootObject);
          }
          choiceArr =[]
          playerCount = 0;
        }
        else {
          io.emit(emitStr, choice2);
          affectForHealth(dam2);
          if (choice2.lootObject) {
            evaluateForLoot(choice2.lootObject);
          }
          choiceArr =[]
          playerCount = 0;
        } 
    }
  }

  //--------------Dice Pick for King--------------//
  function dicePickKing(result, emitStr, choice1, choice3){
    let stats = currentStats();
    console.log('in Kings dice roll');
    console.log('I am the result ' + result);
    playerCount++;
    choiceArr.push(result);
    let count = 0;
    console.log(choiceArr);
    if(playerCount === 4){
      console.log('this how many rolls', playerCount);
      for (let i = 0; i < choiceArr.length; i++){
        count += parseInt(choiceArr[i]);     
      }
      console.log(count);
      if (stats.health > 74) {
        count++
      }
      if (stats.attack > 68) {
        count++
      }
      console.log('adjusted', count);
      if(count <= 12){
        console.log(count, ' <= ', low)
        console.log('bad roll');
        io.emit(emitStr, choice1)
        gameOver(scenario.gameOverKing);
        choiceArr =[]
        playerCount = 0;
        } else {
          console.log(count, ' > ', 12);
          console.log('good roll');
          io.emit(emitStr, choice3);
          choiceArr =[]
          playerCount = 0;
        }
    }
  }



  // ---------- Save Name ------------- //

  function saveName(payload) {
    for (const character in char) {
      console.log(character)
      if (char[character].charClass === payload.charClass) {
        console.log(char[character])
        char[character].name = payload.name;
        console.log(char[character])
      }
    }
  }

  function currentStats() {
    let statObj = { health: 0, attack: 0};
    for (const character in char) {
      statObj.health += char[character].stats.health;
      statObj.attack += char[character].stats.attack;
    }
    console.log(statObj);
    return statObj;
  }
  
  function evaluateForLoot(lootArray) {
    console.log('evaluating for loot');
    for (const character in char) {
      console.log(char[character])
      lootArray.forEach(loot => char[character].activateLoot(loot));
      console.log(char[character])
    }
  }
    
  function evaluateForLootRiddle(lootArray, payload) {
    console.log('evaluating for riddle loot');
    for (const character in char) {
      if (char[character].charClass === payload.char) {
        console.log(char[character])
        lootArray.forEach(loot => char[character].activateLoot(loot));
        console.log(char[character])
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
    
  function gameOver(scenario){
    let stats = currentStats();
    console.log(stats.health);
    io.emit('gameOver', scenario);
    socket.disconnect();
  }

  function gameOverHydra(){
    let stats = currentStats();
    console.log(stats.health);
    if (stats.health < 40) {
    io.emit('gameOver', scenario.gameOverHydra);
    socket.disconnect();
    }
  }


})

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
















