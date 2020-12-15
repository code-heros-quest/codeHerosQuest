// Make connection
var client = io();

// Query DOM
var message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function () {
  client.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
});

message.addEventListener('keypress', function () {
  client.emit('typing', handle.value);
})

// Listen for events


let role = 'Hunter';

client.on('connect', () => {
  welcomeScene();
});

client.on('chat', function (data) {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

client.on('typing', function (data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

client.on('intro', (scenario) => {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + scenario.name + ': </strong>' + scenario.dialogue + '</p>';
})
client.on('atTheWall', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  choiceFunction2(scenario, 'atTheWallChoice');
})
client.on('atTheWallChosen', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  if (scenario.name === 'Battling the Orc Lord') {
    roll(scenario, 'theOrcLordRoll');
  } else {
    roll(scenario, 'theWoodsmanRoll');
  } 
})
client.on('theWoodsManResult', result => {
  spaces();
  console.log(chalk.inverse(result.choiceName));
  console.log(result.dialogue);
  readyStatus('theWoodsmanReady');
})
client.on('theOrcLordResult', result => {
  spaces();
  console.log(chalk.inverse(result.choiceName));
  console.log(result.dialogue);
  readyStatus('theOrcLordReady');
})
client.on('theOldFriend', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  readyStatus('theOldFriendReady');
})
client.on('theVillage', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  choiceFunction2(scenario, 'theVillageChoice');
})
client.on('theVillageChosen', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  if (scenario.name === 'The Goblin') {
    roll(scenario, 'theGoblinRoll');
  } else {
    readyStatus('thePoisonousBiteReady');
  }
})
client.on('theGoblinResult', result => {
  spaces();
  console.log(chalk.inverse(result.choiceName));
  console.log(result.dialogue)
  readyStatus('theGoblinReady');
});
client.on('theTroll', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  roll(scenario, 'theTrollRoll');
})
client.on('theTrollResult', result => {
  spaces();
  console.log(chalk.inverse(result.choiceName));
  console.log(result.dialogue);
  readyStatus('theTrollReady');
})
client.on('theMerchant', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  riddle(scenario, 'theMerchantRiddle', role);
})
client.on('theMerchantRiddleAnswer', results => {
  spaces();
  console.log(results);
})
client.on('theMerchantResults', results => {
  spaces();
  console.log(results.dialogue);
  readyStatus('theMerchantReady');
})
client.on('theWitch', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  riddle(scenario, 'theWitchRiddle');
});
client.on('theWitchRiddleAnswer', results => {
  spaces();
  console.log(results);
})
client.on('theWitchResults', results => {
  spaces();
  console.log(results.dialogue);
  readyStatus('theWitchReady');
})
client.on('theHydra', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  roll(scenario, 'theHydraRoll');
});
client.on('theHydraResult', result => {
  spaces();
  console.log(chalk.inverse(result.choiceName));
  console.log(result.dialogue);
  readyStatus('theHydraReady');
});
client.on('rebellion', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  roll(scenario, 'rebellionRoll');
})
client.on('rebellionResult', result => {
  spaces();
  console.log(chalk.inverse(result.choiceName));
  console.log(result.dialogue);
  readyStatus('rebellionReady');
})
client.on('cityAroundThePalace', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  choiceFunction3(scenario, 'cityAroundThePalaceChoice');
})
client.on('cityAroundThePalaceChosen', choice => {
  spaces();
  console.log(chalk.inverse(choice.choiceName));
  console.log(choice.dialogue);
  readyStatus('cityAroundThePalaceReady');
});
client.on('hornedAnimal', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  readyStatus('hornedAnimalReady');
})
client.on('mageSmith', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  choiceFunction3(scenario, 'mageSmithChoice');
})
client.on('mageSmithChosen', choice => {
  spaces();
  console.log(chalk.inverse(choice.choiceName));
  console.log(choice.dialogue);
  readyStatus('mageSmithReady');
})
client.on('theKingIntro', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  readyStatus('theKingIntroReady');
})
client.on('theKing1', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  riddle(scenario, 'theKing1Riddle', role);
})
client.on('theKing1RiddleAnswer', results => {
  spaces();
  console.log(results);
})
client.on('theKing1Results', results => {
  spaces();
  console.log(results.dialogue);
  readyStatus('theKing1Ready');
})
client.on('theKing2', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  roll(scenario, 'theKing2Roll');
})
client.on('theKing2Result', result => {
  spaces();
  console.log(chalk.inverse(result.choiceName));
  console.log(result.dialogue);
  readyStatus('theKing2Ready');
});
client.on('theKing3', scenario => {
  spaces();
  console.log(chalk.inverse(scenario.name));
  console.log(scenario.dialogue);
  roll(scenario, 'theKing3Roll');
})
client.on('theKing3Result', result => {
  spaces();
  console.log(chalk.inverse(result.choiceName));
  console.log(result.dialogue);
  readyStatus('theKing3Ready');
});
client.on('disconnect', message => {
  console.log(chalk.red('DISCONNECTED!', message));
})
client.on('gameOver', message => {
  spaces();
  console.log(chalk.bgRed(message.name));
  console.log(message.dialogue);
})

///////////////////////////////////////////////

function riddle(scenario, emitStr, role) {
  inquirer
  .prompt([
    {
      name: 'guess',
      message: scenario.choiceQuestion,
      default: 'please enter your guess',
    },
  ])
  .then(answer => {
    let payload = { answer: answer.guess, char: role }
    client.emit(emitStr, payload);
  });
}

function choiceFunction2(scenario, emitStr){
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: scenario.choiceQuestion,
        name: 'Answer',
        choices: [
          new inquirer.Separator('choose one'),
          {
            name: scenario.choices.choice1.choiceName,
          },
          {
            name: scenario.choices.choice2.choiceName,
          },
        ],
      },
    ])
    .then(choice => {
      if (choice.Answer[0] === scenario.choices.choice1.choiceName) {
        client.emit(emitStr, scenario.choices.choice1)
      } else if (choice.Answer[0] === scenario.choices.choice2.choiceName) {
        client.emit(emitStr, scenario.choices.choice2)
      } else {
        client.emit(emitStr, scenario.choices.choice2)
      }
    })
    .catch(error => {
      if(error.isTtyError) {
        //Prompt couldn't be rendered in the current environment
        console.log(error)
      } else {
        console.log('Something else when wrong')
      }
    });
}
function choiceFunction3(scenario, emitStr){
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: scenario.choiceQuestion,
        name: 'Answer',
        choices: [
          new inquirer.Separator('choose one'),
          {
            name: scenario.choices.choice1.choiceName,
          },
          {
            name: scenario.choices.choice2.choiceName,
          },
          {
            name: scenario.choices.choice3.choiceName,
          },
        ],
      },
    ])
    .then(choice => {
      if (choice.Answer[0] === scenario.choices.choice1.choiceName) {
        client.emit(emitStr, scenario.choices.choice1)
      } else if (choice.Answer[0] === scenario.choices.choice2.choiceName) {
        client.emit(emitStr, scenario.choices.choice2)
      } else if (choice.Answer[0] === scenario.choices.choice3.choiceName) {
        client.emit(emitStr, scenario.choices.choice3)
      } else {
        client.emit(emitStr, scenario.choices.choice2)
      }

    })
    .catch(error => {
      if(error.isTtyError) {
        //Prompt couldn't be rendered in the current environment
        console.log(error)
      } else {
        console.log('Something else when wrong')
      }
    });
}



  //-----------READY FUNCTION----------//
  function readyStatus(emitStr) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: 'Hit return to proceed',
          name: 'Answer',
        },
      ])
      .then(choice => {
        let status = null;
        if (choice) {
          status = `${role} Ready`
        }
        client.emit(emitStr, status);
        console.log(chalk.green(status));
      })
      .catch(error => {
        if (error.isTtyError) {
          //Prompt couldn't be rendered in the current environment
          console.log(error)
        } else {
          console.log(chalk.red('Something else when wrong'))
        }
      });
  }


  //---------- DICE ROLL FUNCTION -----------//

  function roll(scenario, emitStr) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: scenario.choiceQuestion,
          name: 'Answer',
        },
      ])
      .then(choice => {
        let randomNumber = Math.floor((Math.random() * 6) + 1);
        client.emit(emitStr, randomNumber);
        console.log(chalk.yellow('You rolled a ', randomNumber));
      })
      .catch(error => {
        if (error.isTtyError) {
          //Prompt couldn't be rendered in the current environment
          console.log(error)
        } else {
          console.log(chalk.red('Something else when wrong'))
        }
      });
  }

function spaces() {
  console.log('');
  console.log('');
}

//////////////////////////////////////////////////

function welcomeScene() {
  let story = `Your name is Silent Crash and you are an Elvin Hunter from the Isle of Glisandrial, homeland to the elves. From the age of 3 years you were trained in warfare like any other elf but you excelled and grew to be a skilled archer and animal tamer. When you were entering adulthood your parents went of to visit a neighboring elvin stronghold and were killed by a band of Orc raiders on elvin land. It is because of human corruption that monsters like Orcs have flourished and become emboldened to trespass where they never have before. You've made it your life's mission to wipe out those that encourage darkness to grow; to seek vengence for the death of your parents. You joined with a mixed band of warriors who have become renowned for your heroic deeds and prowess in battle.`;
  console.log(`Your Story: ${story}`);
  spaces();
}