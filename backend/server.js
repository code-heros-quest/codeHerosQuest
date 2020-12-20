'use strict';
const express = require('express');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http);
require('dotenv').config();

let PORT = process.env.PORT
const { Char, Character } = require('./characters.js');
const loot = require('./loot.js');
const scenarioDialogue = require('./scenarioDialogue.js');
const choiceDialogue = require('./choiceDialogue.js');
const createScenarios = require('./scenario.js');
const Games = require('./games.js');




const liveGames = {};

io.on('connection', (socket) => {
  console.log('a client has connected', socket.id);
  // ---- creates a new game room ---- //
  socket.on('create game', gameName => {
    const game = new Games(gameName, createCharacters);
    liveGames[game.id] = game;
    joinGame(socket, game);
    console.log(game);
    socket.emit('choose character', game.id);
  })

  // ---- adds players to an open game room ---- //
  socket.on('join game', gameId => {
    if (liveGames[gameId]) {
      const game = liveGames[gameId];
      joinGame(socket, game);
      game.offerCharacters();
    } else {
      socket.emit('error', 'Incorrect game code');
    }
  })

  // ---- all players chose a character and send back name ---- //
  socket.on('start game', charInfo => {
    console.log(charInfo);
    const game = liveGames[socket.gameId];
    game.storeCharacters(charInfo);
    startGame(charInfo);
  })

  socket.on('chat', function (data) {
    const game = liveGames[socket.gameId];
    for (let player of game.players) {
      player.emit('chat', data);
    }
  });

  // Handle typing event - not currently live
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });

  socket.on('ready', next => {
    const game = liveGames[socket.gameId];
    game.readyStatus(next);
    console.log('recieved ready');
    game.updatePlayerStats(socket);
    console.log('emited character update');
  })

  socket.on('roll', payload => {
    const game = liveGames[socket.gameId];
    game.rollEvaluator(socket, payload);
    console.log('recieved roll');
    // payload will have .scenario and .roll whcih will be that players roll
    // will emit a result with the rollResult attached
  })

  socket.on('riddle', payload => {
    console.log(payload);
    const game = liveGames[socket.gameId];
    game.riddleEvaluator(socket, payload);
    console.log('recieved riddle');
    // payload will have .scenario and .answer which is their answer to the riddle, and .char with hunter/assasin/warr/or wizard so I can evaluate for individual rewards
    // if they get their answer correct we will emit a single player response
    // the choice will be determined on the total number of players to answer correctly
  })

  socket.on('choice', payload => {
    const game = liveGames[socket.gameId];
    game.choiceVote(payload);
    console.log('recieved choice');
    // payload.vote, payload.scenario
    // payload that has the scenario, AND that players vote
    // if we get three votes for one choice it wins, we serve back the dialogue for that choice
    // if we gwt a tie it is random?
    // write a function that takes in the votes, count votes, once we get four it emits the 'result' payload of the scenario.choices.choice1/2/3/4
    // payload = {
    //   vote: 1,
    //   scenario: scenario.atTheWall
    // }
  })

  socket.on('luck', payload => {
    const game = liveGames[socket.gameId];
    game.luckEvaluator(socket, payload);
    console.log('recieved luck');
    // payload will have .scenario and .luck whcih will 0 or 1 depending on that players luck
    // will emit a result with the luckResult attached
  })

  socket.on('end', () => {
    socket.disconnect()
    if (liveGames[socket.gameId]) {
      delete liveGames[socket.gameId]
    }
  })

  //---------------- start game ------------------//
  function startGame(charInfo) {
    console.log(charInfo.char);
    const game = liveGames[socket.gameId];
    game.char[charInfo.char.toLowerCase()].name = charInfo.name;
    socket.charType = charInfo.char.toLowerCase();
    socket.charName = charInfo.name;
    console.log(socket);
    game.responseCount++;
    if (game.responseCount === 4) {
      let char = game.char;
      game.sDialogue = scenarioDialogue(char);
      game.cDialogue = choiceDialogue(char);
      let sDialogue = game.sDialogue;
      let cDialogue = game.cDialogue;
      game.scenarios = createScenarios(sDialogue, cDialogue, loot);
      // for (let player of game.players) {
      //   player.emit('scenario', game.scenarios.intro);
      // }
      game.responseCount = 0;
    }
    console.log(game);

  }

  // -------------Joins Game--------------//
  function joinGame(socket, game) {
    game.players.push(socket);
    console.log('player joined the game', game.id);
    let id = game.id;
    socket.join(id)
    console.log(game.id);
    socket.gameId = id;
    console.log(socket.id + ' joined ' + id);
  }



  // -------------creates character instance--------------- //
  function createCharacters(charInfo) {
    let assassin = new Character('Athyrium', 'Human', 'Assassin', 20, 25, 15)
    let hunter = new Character('Silent Crash', 'Elf', 'Hunter', 20, 25, 15);
    let warrior = new Character('Bristle Beard', 'Ogre', 'Warrior', 30, 25, 10);
    let wizard = new Character('Ibus', 'Hobbit', 'Wizard', 30, 25, 10)
    let char = new Char(assassin, hunter, warrior, wizard);
    return char;
  }

})

http.listen(PORT, function () {
  console.log(`listening for requests on port ${PORT}`);
});














