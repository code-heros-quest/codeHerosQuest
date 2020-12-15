'use strict';
const loot = require('./loot.js');

class Character {
  constructor(name, race, charClass, health, attack) {
    this.name = name;
    this.race = race;
    this.charClass = charClass;
    this.stats = { health: health, attack: attack };
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
    }
  }
}

let assassin = new Character('Athyrium', 'Human', 'Assassin', 20, 15)
let hunter = new Character('Silent Crash', 'Elf', 'Hunter', 20, 15);
let warrior = new Character('Bristle Beard', 'Ogre', 'Warrior', 30, 10);
let wizard = new Character('Ibus', 'Hobbit', 'Wizard', 30, 10)


module.exports = {
  assassin,
  hunter,
  warrior,
  wizard
}

