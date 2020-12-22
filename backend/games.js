'use strict';

class Games {
  constructor(today, id, gameName, createCharacters) {
    this.name = gameName;
    this.id = id;
    this.timeStamp = today;
    this.players = [];
    this.responseCount = 0;
    this.count = 0;
    this.tempArr = [];
    this.char = createCharacters();
    this.charArray = [];
  }

  //------------------ READY FUNCTION ----------------//
  readyStatus(scenarioNum) {
    this.responseCount++;
    if (this.responseCount === 4) {
      let scenario = this.nextScenario(scenarioNum);
      this.players.forEach(player => {
        player.emit('scenario', scenario);
      });
      this.responseCount = 0;
    }
  }

  // ------------------ CHOICE SCENARIOS ----------------//
  //expecting votes and scenario from paylod of socket.on 'choice'
  choiceVote(payload) {
    this.tempArr.push(Number(payload.vote));
    let ch1 = 0;
    let ch2 = 0;
    let ch3 = 0;
    let ch4 = 0
    if (this.tempArr.length === 4) {
      for (let i = 0; i < this.tempArr.length; i++) {
        if (this.tempArr[i] === 1) {
          ch1++
        } else if (this.tempArr[i] === 2) {
          ch2++
        } else if (this.tempArr[i] === 3) {
          ch3++
        } else if (this.tempArr[i] === 4) {
          ch4++
        }
      }
      if (ch1 > ch2 && ch1 > ch3 && ch1 > ch4) {
        var choice = payload.scenario.choices.choice1
      }
      else if (ch2 > ch1 && ch2 > ch3 && ch2 > ch4) {
        var choice = payload.scenario.choices.choice2
      }
      else if (ch3 > ch2 && ch3 > ch1 && ch3 > ch4) {
        var choice = payload.scenario.choices.choice3
      }
      else if (ch4 > ch1 && ch4 > ch2 && ch4 > ch3) {
        var choice = payload.scenario.choices.choice4
      }
      else {
        let random = this.tempArr[Math.floor(Math.random() * this.tempArr.length)]
        if (random === 1) {
          var choice = payload.scenario.choices.choice1
        }
        if (random === 2) {
          var choice = payload.scenario.choices.choice2
        }
        if (random === 3) {
          var choice = payload.scenario.choices.choice3
        }
        if (random === 4) {
          var choice = payload.scenario.choices.choice4
        }
      }
      this.tempArr = [];
      if (choice.lootObject) {
        this.evaluateForLoot(choice.lootObject);
      }
      this.players.forEach(player => {
        player.emit(`result`, choice);

      });
    }
  }

  // ---------- riddle eval ------------- //
  riddleEvaluator(socket, payload) {
    this.responseCount++
    let possibleLoot = payload.scenario.choices.riddle2.lootObject;
    let answerArray = payload.scenario.choices.riddle2.correct;
    let correctDialogue = payload.scenario.choices.riddle2;
    let incorrectDialogue = payload.scenario.choices.riddle1;
    if (answerArray.includes(payload.answer.toLowerCase())) {
      socket.emit('single result', correctDialogue);
      this.evaluateForLootRiddle(socket, possibleLoot);
      this.count++
    } else {
      socket.emit('single result', incorrectDialogue);
    }
    if (this.responseCount === 4) {
      if (this.count >= 2) {
        this.players.forEach(player => {
          player.emit(`result`, payload.scenario.choices.riddle4);
        });
        this.evaluateForLoot(payload.scenario.choices.riddle4.lootObject);
      } else {
        this.players.forEach(player => {
          player.emit(`result`, payload.scenario.choices.riddle3);
        });
      }
      this.count = 0;
      this.responseCount = 0;
    }
    // add singleResult listener on client side
  }


  // ---------- LUCK Evaluator ------------- //
  luckEvaluator(socket, payload) {
    let singleResult = { name: 'Result Announcement', message: '' };
    if (payload.luck === 0) {
      singleResult.message = 'Sorry, your luck was bad. Hopefully the other members of your team faired better'
    }
    if (payload.luck === 1) {
      singleResult.message = 'Congratulations, you had good luck. Hopefully the rest of your team does as well'
    }
    socket.emit('chat', singleResult);
    this.responseCount++;
    this.count += payload.luck;
    if (this.responseCount === 4) {
      let result = {}
      if (this.count >= 2) {
        result = payload.scenario.choices.goodLuck;
      } else {
        result = payload.scenario.choices.badLuck;
      }
      this.evaluateForLoot(result.lootObject);
      this.players.forEach(player => {
        player.emit(`result`, result);
      });
      this.count = 0;
      this.responseCount = 0;
    }
  }


  // ---------- NEW Dice Roll ------------//
  rollEvaluator(socket, payload) {
    let singleResult = { name: 'Result Annoucement', message: `You rolled a ${payload.roll}. Your roll will be combined with the rest of your team to determine the outcome of your battle.` };
    socket.emit('chat', singleResult);
    this.responseCount++;
    this.count += payload.roll;
    if (this.responseCount === 4) {
      let stats = this.currentStats();
      let extraRoll = this.percentageEvaluator(stats, payload);
      this.count += extraRoll;
      let rollResult = {};
      if (this.count >= 23) {
        rollResult = payload.scenario.choices.highRoll;
      } else if (this.count >= 15) {
        rollResult = payload.scenario.choices.medRoll;
      } else {
        rollResult = payload.scenario.choices.lowRoll;
      }
      this.affectForHealth(rollResult.damage);
      this.evaluateForLoot(rollResult.lootObject);
      this.players.forEach(player => {
        player.emit(`result`, rollResult);
        let data = {name: 'Health Announcement', message: `Your health decreased by ${rollResult.damage} in this battle`}
        player.emit('chat', data);
      });
      this.count = 0;
      this.responseCount = 0;
    }
  }

  // ---------- Update Character Stats --------- //
  updatePlayerStats(socket) {
    for (const character in this.char) {
      if (socket.charType === this.char[character].charClass.toLowerCase()) {
        let payload = this.char[character]
        socket.emit('character', payload);
      }
    }
  }

  currentStats() {
    let statObj = { health: 0, attack: 0 };
    for (const character in this.char) {
      statObj.health += this.char[character].stats.health;
      statObj.attack += this.char[character].stats.attack;
    }
    return statObj;
  }

  evaluateForLoot(lootArray) {
    console.log('evaluating for loot');
    if (lootArray !== null) {
      let lootMessage = '';
      lootArray.forEach(item => {
        item.role.forEach(reciever => {
          lootMessage += `The ${reciever} recieved ${item.name}. Item stats: Health ${item.health} Attack ${item.attack}. `;
        });
      });
      for (const character in this.char) {
        lootArray.forEach(loot => {
          this.char[character].activateLoot(loot);
        });
      }
      let data = { name: 'Loot Announcement', message: lootMessage };
      console.log(data);
      if (data.message !== '') {
        for (let player of this.players) {
          player.emit('chat', data);
        }
      }
    }
  }

  evaluateForLootRiddle(socket, lootArray) {
    console.log('evaluating for loot');
    let role = socket.charType
    let charRole = socket.charType;
    if (lootArray !== null) {
      let lootMessage = '';
      lootArray.forEach(item => {
        item.role.forEach(reciever => {
          if (charRole === reciever.toLowerCase()) {
            lootMessage += `The ${reciever} recieved ${item.name}. Item stats: Health ${item.health} Attack ${item.attack}. `;

          }
        });
      });
      lootArray.forEach(loot => {
        this.char[role].activateLoot(loot);
      });
  
      let data = { name: 'Loot Announcement', message: lootMessage };
      if (data.message !== '') {
        for (let player of this.players) {
          player.emit('chat', data);
        }
      }
    }
  }

  affectForHealth(value) {
    for (const character in this.char) {
      this.char[character].loseHealth(value)
      if (this.char[character].stats.health < 1) {
        this.gameOver(this.scenarios.gameOverDeath);
      }
    }
  }

  nextScenario(num) {
    for (const scenario in this.scenarios) {
      if (this.scenarios[scenario].number === num) {
        return this.scenarios[scenario];
      }
    }
  }

  percentageEvaluator(stats, payload) {
    let baseNumber = stats.attack - payload.scenario.choices.attackPotential.low;
    let totalNumber = payload.scenario.choices.attackPotential.high - payload.scenario.choices.attackPotential.low;
    let percentage = baseNumber / totalNumber;
    let extraRoll = 0;
    if (percentage > .7) {
      extraRoll = 6;
    } else if (percentage > .4) {
      extraRoll = 3;
    } else {
      extraRoll = 1;
    }
    return extraRoll;
  }

  storeCharacters(charInfo) {
    this.charArray.push(charInfo);
    this.offerCharacters();
  }

  offerCharacters() {
    const availableCharacters = [{ role: 'Hunter', img: './images/Hunter.png', }, { role: 'Assassin', img: './images/Assassin.png' }, { role: 'Warrior', img: './images/Warrior.png' }, { role: 'Wizard', img: './images/Wizard.png' }];
    availableCharacters.forEach(char => {
      if (!this.charArray.includes(char.role)) {
        this.tempArr.push(char);
      }
    })
    this.players.forEach(player => {
      player.emit(`char array`, this.tempArr);
    });
    this.tempArr = [];
  }

  // ----------- disconect functions ---------- //
  // add client side game over listener?
  gameOver(scenario) {
    this.players.forEach(player => {
      player.emit(`gameOver`, scenario);
      player.disconnect();
    });
  }

  gameOverHydra() {
    let stats = this.currentStats();
    if (stats.health < 40) {
      this.players.forEach(player => {
        player.emit(`gameOver`, this.scenarios.gameOverHydra);
        player.disconnect;
      });
    }
  }
}

module.exports = Games;