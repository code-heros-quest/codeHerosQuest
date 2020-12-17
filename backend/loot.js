'use strict'

const char = require('./characters.js')

class Loot {
  constructor(name, role, health, attack) {
    this.name = name;
    this.role = role;
    this.health = health;
    this.attack = attack;
  }

}

let orcLordMace = new Loot('Orc Lord Mace', ['Warrior'], 0, 2);
let herbalSalve = new Loot('Herbal Salve', ['Warrior', 'Wizard', 'Assassin', 'Hunter'], 2, 0);
let strongBandages = new Loot('Strong Bandages', ['Warrior', 'Wizard', 'Assassin', 'Hunter'], 6, 0);
let falcon = new Loot('Falcon', ['Hunter'], 0, 0);
let enchantedRing = new Loot('Enchanted Ring', ['Hunter'], 2, 3)
let roseLocket = new Loot('Rose Locket', ['Wizard'], 3, 2);
let travelRations = new Loot('Travel Rations', ['Warrior', 'Wizard', 'Assassin', 'Hunter'], 2, 0);
let woolBandages = new Loot('Wool Bandages', ['Warrior', 'Wizard', 'Assassin', 'Hunter'], 2, 0)
let sheild = new Loot('Sheild', ['Warrior'], 3, 2);
let poisonousBerries = new Loot('Poinsonous Berries', ['Assassin'], 0, 3);
let magicalAmulet = new Loot('Magical Amulet', ['Wizard'], 3, 2);
let hoodAndJesses = new Loot('Hood and Jesses', ['Hunter'], 2, 3);
let strengthSpell = new Loot('Strength Spell', ['Warrior', 'Wizard', 'Assassin', 'Hunter'], 0, 1);
let gnarledStaff = new Loot('Gnarled Staff', ['Wizard'], 0, 2);
let rebelBandagesSmall = new Loot('Small Rebel Bandages', ['Assassin', 'Hunter'], 4, 0);
let rebelBandagesLarge = new Loot('Large Rebel Bandages', ['Wizard', 'Warrior'], 8, 0);
let strongHeirloomBow = new Loot('Strong Heirloom Bow', ['Hunter'], 0, 6);
let brittleHeirloomBow = new Loot('Brittle Heirloom Bow', ['Hunter'], 0, 1);
let mightyEnchantedSword = new Loot('Mighty Enchanted Sword', ['Assassin'], 0, 6);
let mysteriousSword = new Loot('Mysterious Sword', ['Assassin'], 0, 1);

module.exports = {
  orcLordMace,
  herbalSalve,
  strongBandages,
  falcon,
  woolBandages,
  travelRations,
  roseLocket,
  enchantedRing,
  sheild,
  poisonousBerries,
  magicalAmulet,
  hoodAndJesses,
  strengthSpell,
  gnarledStaff,
  rebelBandagesSmall,
  rebelBandagesLarge,
  strongHeirloomBow,
  brittleHeirloomBow,
  mightyEnchantedSword,
  mysteriousSword
}