'use strict';
const express = require('express');
const app = express();
const path = require('path')
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
    let today = Date.now()
    let id = createID();
    const game = new Games(today, id, gameName, createCharacters);
    liveGames[game.id] = game;
    joinGame(socket, game);
    socket.emit('choose character', game.id);
    deleteOldGames(today);
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

  socket.on('choose character', charInfo => {
    const game = liveGames[socket.gameId];
    game.storeCharacters(charInfo);
  })

  // ---- all players chose a character and send back name ---- //
  socket.on('start game', charInfo => {
    const game = liveGames[socket.gameId];
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
    game.updatePlayerStats(socket);
  })

  socket.on('roll', payload => {
    const game = liveGames[socket.gameId];
    game.rollEvaluator(socket, payload);
  })

  socket.on('riddle', payload => {
    const game = liveGames[socket.gameId];
    game.riddleEvaluator(socket, payload);
  })

  socket.on('choice', payload => {
    const game = liveGames[socket.gameId];
    game.choiceVote(payload);
  })

  socket.on('luck', payload => {
    const game = liveGames[socket.gameId];
    game.luckEvaluator(socket, payload);
  })

  socket.on('end', () => {
    if (liveGames[socket.gameId]) {
      delete liveGames[socket.gameId]
    }
    socket.disconnect()
  })

  //---------------- start game ------------------//
  function startGame(charInfo) {
    const game = liveGames[socket.gameId];
    game.char[charInfo.char.toLowerCase()].name = charInfo.name;
    socket.charType = charInfo.char.toLowerCase();
    socket.charName = charInfo.name;
    game.responseCount++;
    if (game.responseCount === 4) {
      let char = game.char;
      game.sDialogue = scenarioDialogue(char);
      game.cDialogue = choiceDialogue(char);
      let sDialogue = game.sDialogue;
      let cDialogue = game.cDialogue;
      game.scenarios = createScenarios(sDialogue, cDialogue, loot);
      game.players.forEach(player => player.emit('begin game'));
      game.responseCount = 0;
    }
  }

  // -------------Joins Game--------------//
  function joinGame(socket, game) {
    game.players.push(socket);
    let id = game.id;
    socket.join(id)
    socket.gameId = id;
  }

  // -------------creates character instance--------------- //
  function createCharacters() {
    let assassin = new Character('Athyrium', 'Human', 'Assassin', 20, 25, 18, 10, 15, './images/Assassin.png');
    let hunter = new Character('Silent Crash', 'Elf', 'Hunter', 20, 25, 18, 10, 15, './images/Hunter.png');
    let warrior = new Character('Bristle Beard', 'Ogre', 'Warrior', 30, 35, 25, 15, 10, './images/Warrior.png');
    let wizard = new Character('Ibus', 'Hobbit', 'Wizard', 30, 35, 25, 15, 10, './images/Wizard.png')
    let char = new Char(assassin, hunter, warrior, wizard);
    return char;
  }
})

//------------- Create Unique Id ------------------//
function createID() {
  let id = Math.floor(Math.random() * Math.floor(2000));
  for (const games in liveGames) {
    if (liveGames[games].id === id) {
      return createID();
    }
  }
  return id;
}

// -------------- Delete expired games ---------------- //
function deleteOldGames(today) {
  for (const games in liveGames) {
    if (today - liveGames[games].timeStamp > 86400000) {
      console.log(liveGames[games].name, 'deleted');
      delete liveGames[games];
    }
  }
}

__dirname = path.resolve()

if(process.env.NODE_ENV === 'production') {
 app.use(express.static(path.join(__dirname, '/gametest/build')))
 
 app.get('*', (req, res) => 
   res.sendFile(path.resolve(__dirname, 'gametest', 'build', 'index.html'))
 )} 
  else {
    app.get('/', (req))
  }

http.listen(PORT, function () {
  console.log(`listening for requests on port ${PORT}`);
});










