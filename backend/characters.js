'use strict';
const loot = require('./loot.js');

class Char {
  constructor(assassin, hunter, warrior, wizard) {
    this.assassin = assassin;
    this.hunter = hunter;
    this.warrior = warrior;
    this.wizard = wizard;
  }
}

class Character {
  constructor(name, race, charClass, health, attack) {
    this.name = name;
    this.race = race;
    this.charClass = charClass;
    this.stats = { health: health, attack: attack };
    this.loot = [];
  }

  addHealth(value) {
    this.stats.health += value;
  }
  loseHealth(value) {
    if (this.stats.health <= 0) {
      //gameOver();
    } else {
      this.stats.health -= value;
    }
  }
  addAttack(value) {
    this.stats.attack += value;
  }
  activateLoot(lootObj) {
    let role = lootObj.role;
    if (role.includes(this.charClass)) {
      this.addHealth(lootObj.health);
      this.addAttack(lootObj.attack);
      this.loot.push(lootObj);
    }
  }
}

// let assassin = new Character('Athyrium', 'Human', 'Assassin', 20, 15)
// let hunter = new Character('Silent Crash', 'Elf', 'Hunter', 20, 15);
// let warrior = new Character('Bristle Beard', 'Ogre', 'Warrior', 30, 10);
// let wizard = new Character('Ibus', 'Hobbit', 'Wizard', 30, 10)

// these character objects will be created when a room is created and their names will be mutable
// once all players have logged in a game will be created 
// first the Char instance will be created based on these characters and it will be saved to var char
// then the scenarioDialogue and choiceDialogue functions will be called with char passed in and save to variable sDialogue and cDialogue in that game instance
// then an instance of scenarios will be created... how does this work?
// we have to render the scenarios based on the sDialogue and cDialogue variables... is this all just a parent function? yes? calls createScenarios - passes in loot, this.sDialogue, this.cDialogue saves to an object called scenarios?
// https://hyperpad.zendesk.com/hc/en-us/articles/360031646791-Setting-up-a-Multiplayer-Game-with-Socket-io

// the server will require { Char, Character } from characters.js
// createScenarios from scenario.js
// scenarioDialogue
// choiceDialogue
// loot


module.exports = {
  Char,
  Character
}

