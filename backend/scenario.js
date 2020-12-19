'use strict';

function createScenarios(sDialogue, cDialogue, loot) {
  class Choice {
    constructor(num, name, dialogue, lootObject, next) {
      this.num = num;
      this.name = name;
      this.dialogue = dialogue;
      this.lootObject = lootObject;
      this.next = next;
    }
  }

  class Riddle {
    constructor(num, correct, name, dialogue, lootObject, next) {
      this.num = num;
      this.correct = correct;
      this.name = name;
      this.dialogue = dialogue;
      this.lootObject = lootObject;
      this.next = next;
    }
  }

  class Roll {
    constructor(num, name, damage, dialogue, lootObject, next) {
      this.num = num;
      this.name = name;
      this.damage = damage;
      this.dialogue = dialogue;
      this.lootObject = lootObject;
      this.next = next;
    }
  }

  class Luck {
    constructor(num, name, dialogue, lootObject, next) {
      this.num = num;
      this.name = name;
      this.dialogue = dialogue;
      this.lootObject = lootObject;
      this.next = next;
    }
  }

  class Scenario {
    constructor(number, video, name, dialogue, type, choiceQuestion, choices, next) {
      this.number = number;
      this.video = video;
      this.name = name;
      this.dialogue = dialogue;
      this.type = type;
      this.choiceQuestion = choiceQuestion
      this.choices = choices;
      this.next = next;
    }
    updateDialogue(char) {
      this.dialogue = this.dialogue;
      this.choices.dialogue = this.choices.dialogue;
    }
  }

  // Scenarios in reverse order, choices first
  // Game Over - death
  const gameOverDeath = new Scenario('GAME OVER due to death', sDialogue.gameOverDeath, null, null, null);

  // Game Over - hydra
  const gameOverHydra = new Scenario('GAME OVER due to diminished health', sDialogue.gameOverHydra, null, null, null);

  const gameOverKing = new Scenario('GAME OVER the King has defeated you', sDialogue.gameOverKing, null, null, null);

  const gameOverWin = new Scenario('GAME OVER you have won', sDialogue.gameOverWin, null, null, null)

  // BOSS 5 : THE KING
  // fight three
  const theKing3Rolls = {
    attackPotential: { low: 48, high: 52 },
    lowRoll: new Roll(1, 'Poor Roll', cDialogue.theKing3Rolls1, null),
    medRoll: new Roll(2, 'Fair Roll', cDialogue.theKing3Rolls2, null),
    highRoll: new Roll(3, 'Good Roll', cDialogue.theKing3Rolls3, null)
  }

  const theKing3 = new Scenario(31, 'The King: Close Combat', sDialogue.theKing3, 'roll', 'Roll to see if you survived the battle', theKing3Rolls, null)

  // fight two
  const theKing2Rolls = {
    attackPotential: { low: 48, high: 52 },
    lowRoll: new Roll(1, 'Poor Roll', cDialogue.theKing2Rolls1, null, 31),
    medRoll: null,
    highRoll: new Roll(3, 'Good Roll', cDialogue.theKing2Rolls2, null, 31)
  }

  const theKing2 = new Scenario(30, null, 'The King: Ranged Battle', sDialogue.theKing2, 'roll', `Roll to see the outcome of your first engagement with the King`, theKing2Rolls, null);

  // fight one
  const theKing1Riddle = {
    riddle1: new Riddle(1, null, 'Wrong Answer', cDialogue.theKing1Riddle1, null, 30),
    riddle2: new Riddle(2, ['nothing'], 'Correct Answer', cDialogue.theKing1Riddle2, null, 30),
    riddle3: new Riddle(3, null, 'Less than half of you were corect', cDialogue.theKing1Riddle3, null, 30),
    riddle4: new Riddle(4, null, 'Half or more answered correctly', cDialogue.theKing1Riddle4, null, 30),
  }
  const theKing1 = new Scenario(29, null, 'The King: Battle of the Wits', sDialogue.theKing1, 'riddle', 'What a poor man has, a rich man wants, and if you eat it you die. What am I?', theKing1Riddle, null);

  // the king intro
  const theKingIntro = new Scenario(28, null, 'The King: Approaching the Castle', sDialogue.theKingIntro, 'ready2', null, null, 29);

  // NPC 6 : Mage-Smith
  const mageSmithChoices = {
    choice1: new Choice(1, 'Try to hush him', cDialogue.mageSmithChoices1, [loot.mightyEnchantedSword], 28),
    choice2: new Choice(2, 'Rise to his level', cDialogue.mageSmithChoices2, [loot.mightyEnchantedSword], 28),
    choice3: new Choice(3, 'Just walk away', cDialogue.mageSmithChoices3, [loot.mysteriousSword], 28)
  }
  const mageSmith = new Scenario(27, null, 'The Mage-Smith', sDialogue.mageSmith, 'choice3', `While it is a comical sight you are trying to avoid drawing attention to yourselves and you need to calm him down. Do you:`, mageSmithChoices, null);


  // wishing well ******
  const wishingWellLuck = {
    luck1: new Luck(1, 'Bad Luck', cDialogue.wishingWellLuck1, null, 27),
    luck2: new Luck(2, 'Good Luck', cDialogue.wishingWellLuck2, [loot.blessedWater], 27)
  }

  const wishingWell = new Scenario(26, null, 'The Wishing Well', sDialogue.wishingWell, 'luck', `You hope for luck as you fall asleep`, wishingWellLuck, null);

  // horned animal
  const hornedAnimalChoices = {
    choice1: new Choice(1, 'Visit the Sprite', cDialogue.hornedAnimalChoices1, null, 26),
    choice2: new Choice(2, 'Onward to the castle', cDialogue.hornedAnimalChoices2, null, 27)
  }
  const hornedAnimal = new Scenario(25, null, 'The Horned Animal', sDialogue.hornedAnimal, 'choice2', `You know that water sprites can grant great blessings, will you detour from your path to visit the sprite?`, hornedAnimalChoices, null)

  // city before the palace
  const cityChoices = {
    choice1: new Choice(1, 'Circus Troupe', cDialogue.cityChoices1, null, 25),
    choice2: new Choice(2, 'Minstrals', cDialogue.cityChoices2, null, 25),
    choice3: new Choice(3, 'Brotherhood of Monks', cDialogue.cityChoices3, null, 25)
  }

  const cityAroundThePalace = new Scenario(24, null, 'City Around the Palace', sDialogue.cityAroundThePalace, 'choice3', 'What kind of disguise do you think you should use?', cityChoices, null)

  // NPC 5 : Rebellion
  const rebellionLuck = {
    badLuck: new Luck(1, 'Poor Luck', cDialogue.rebellionLuck1, [loot.brittleHeirloomBow, loot.rebelBandagesSmall, loot.rebelBandagesLarge], 24),
    goodLuck: new Luck(2, 'Good Luck', cDialogue.rebellionLuck2, [loot.strongHeirloomBow, loot.rebelBandagesSmall, loot.rebelBandagesLarge], 24)
  }
  const rebellion = new Scenario(23, null, 'Rebellion', sDialogue.rebellion, 'roll', `roll for a chance to add your luck to the enchantress' spell`, rebellionLuck, null);


  // BOSS 4 : Hydra

  const theHydraRolls = {
    attackPotential: { low: 48, high: 52 },
    lowRoll: new Roll(1, 'Poor Roll', 20, cDialogue.theHydraRolls1, null, 23),
    medRoll: new Roll(2, 'Fair Roll', 9, cDialogue.theHydraRolls2, null, 23),
    highRoll: new Roll(3, 'Good Roll', 5, cDialogue.theHydraRolls3, null, 23)
  }

  const theHydra = new Scenario(22, null, 'TheHydra', sDialogue.theHydra, 'roll', 'Roll the dice to determine the fate of your battle', theHydraRolls, null);

  // NPC 4 : Witch
  const theWitchRiddle = {
    riddle1: new Riddle(1, null, 'Wrong Answer', cDialogue.theWitchRiddle1, null, 22),
    riddle2: new Riddle(2, ['a skull', 'skull'], 'Correct Answer', cDialogue.theWitchRiddle2, [loot.strengthSpell], 22),
    riddle3: new Riddle(3, null, '2 or more incorrect', cDialogue.theWitchRiddle3, null, 22),
    riddle4: new Riddle(4, null, '3 or more correct', cDialogue.theWitchRiddle4, [loot.gnarledStaff], 22)
  }

  const theWitch = new Scenario(21, null, 'The Witch', sDialogue.theWitch, 'riddle', `“I don’t have eyes, But once I did see. I once had thoughts, Now white and empty. What am I?”`, theWitchRiddle, null);

  // theRingAndTheRose
  const theRingAndTheRoseChoice = {
    choice1: new Choice(1, 'The Warrior and the Assasin', cDialogue.theRingAndTheRoseChoice1, null, 21),
    choice2: new Choice(2, 'The Wizard and the Warrior', cDialogue.theRingAndTheRoseChoice2, [loot.roseLocket], 21),
    choice3: new Choice(3, 'The Assasin and the Hunter', cDialogue.theRingAndTheRoseChoice3, [loot.enchantedRing], 21),
    choice4: new Choice(4, 'The Hunter and the Wizard', cDialogue.theRingAndTheRoseChoice4, [loot.roseLocket, loot.enchantedRing], 21)
  };

  const theRingAndTheRose = new Scenario(20, null, 'The Ring and the Rose', sDialogue.theRingAndTheRose, 'choice4', 'You may only select two members of your party to be tested for these items, who will you choose?', theRingAndTheRoseChoice, null);

  // theKingMaker
  const theKingMakerChoices = {
    choice1: new Choice(1, 'No, why let him know there will soon be a vacancy?', cDialogue.theKingMakerChoices1, null, 21),
    choice2: new Choice(2, 'Yes, the enemy of my enemy is my friend?', cDialogue.theKingMakerChoices2, null, 20)
  }
  const theKingMaker = new Scenario(19, null, 'The King Maker', sDialogue.theKingMaker, 'choice2', `Do you tell him of your quest to kill the King?`, theKingMakerChoices, null)

  // backToTheSmithy 
  const backToTheSmithyChoices = {
    choice1: new Choice(1, `No, you don't want to inflate his sense of self importance`, cDialogue.backToTheSmithyChoices1, [loot.improvedArmor], 21),
    choice2: new Choice(2, `Yes, you can't resist the opportunity to hear this farfetched tale from the horses mouth`, cDialogue.backToTheSmithyChoices2, [loot.improvedArmor], 19)
  }
  const backToTheSmithy = new Scenario(18, null, 'Back to the Smithy', sDialogue.backToTheSmithy, 'choice2', 'Do you ask him about the broadsword?', backToTheSmithyChoices, null)

  // theShepherdsHouse
  const theShepherdsHouse = new Scenario(17, null, `The Shepherd's House`, sDialogue.theShepherdsHouse, 'ready2', null, null, 18);

  // theBoisterousBaker

  const theBoisterousBaker = new Scenario(16, null, 'The Boisterous Baker', sDialogue.theBoisterousBaker, 'ready2', null, null, 18)


  // Iron Forge ***********
  const ironForgeChoices = {
    choice1: new Choice(1, 'Look for cloth for bandages', cDialogue.theIronForgeChoices1, [loot.woolBandages], 17),
    choice2: new Choice(2, 'Look for food to restock rations', cDialogue.theIronForgeChoices2, [loot.travelRations], 16)
  }

  const ironForge = new Scenario(15, null, 'Iron Forge', sDialogue.ironForge, 'choice2', `What supplies do you want to ask for?`, ironForgeChoices, null);

  // neutralGround *******
  const neutralZoneLuck = {
    Luck1: new Luck(1, 'Poor Luck', cDialogue.neutralZoneLuck1, null, 21),
    Luck2: new Luck(2, 'Good Luck', cDialogue.neutralZoneLuck2, [loot.tinTownBandages], 21)
  }

  const neutralZone = new Scenario(14, null, 'Neutral Zone', sDialogue.neutralZone, 'luck3', 'Flip three coins for a chance to purchase supplies', neutralZoneLuck, null);



  // curiosityKilledTheCat *********
  const curiosityKilledTheCatChoices = {
    choice1: new Choice(1, 'Head to the center in search of the Neutal Zone', cDialogue.curiosityChoices1, null, 14),
    choice2: new Choice(2, 'Cut your losses and head out', cDialogue.curiosityChoices2, null, 21)
  }

  const curiosityKilledTheCat = new Scenario(13, null, 'Curiosity Killed the Cat', sDialogue.curiosityKilledTheCat, 'choice2', `Do you head to the Neutral Zone or leave town?`, curiosityKilledTheCatChoices, null);


  // Tin Town ************
  const tinTownChoices = {
    choice1: new Choice(1, 'Head into the tent city', cDialogue.tinTownChoices1, null, 14),
    choice2: new Choice(2, 'Ask the woman what this place is', cDialogue.tinTownChoices2, null, 13),
    choice3: new Choice(3, 'Cut your losses', cDialogue.tinTownChoices3, null, 21)
  };

  const tinTown = new Scenario(12, null, 'Tin Town', sDialogue.tinTown, 'choice3', `Do you head further in seeking supplies, try to get more information before deciding, or cut your losses and follow the road winding south-east out of here?`, tinTownChoices, null);


  // NPC 3 : Merchant
  const theMerchantRiddle = {
    riddle1: new Riddle(1, null, 'Wrong Answer', cDialogue.theMerchantRiddle1, null, 12),
    riddle2: new Riddle(2, ['footsteps', 'foot steps'], 'Correct Answer', cDialogue.theMerchantRiddle2, [loot.poisonousBerries, loot.sheild, loot.hoodAndJesses, loot.magicalAmulet], 12),
    riddle3: new Riddle(3, null, '2 or more incorrect', cDialogue.theMerchantRiddle3, null, 12),
    riddle4: new Riddle(4, null, '3 or more correct', cDialogue.theMerchantRiddle4, null, 12),

  }

  const theMerchant = new Scenario(11, null, 'The Merchant', sDialogue.theMerchant, 'riddle', `"The more you take, the more you leave behind. What am I?"`, theMerchantRiddle, null);

  // FORK IN THE ROAD *****
  const forkInTheRoadChoices = {
    choice1: new Choice(1, 'Follow the Coins', cDialogue.forkInTheRoad1, null, 11),
    choice2: new Choice(2, 'Follow the Hammer', cDialogue.forkInTheRoad2, null, 15)
  };

  const forkInTheRoad = new Scenario(10, null, 'Fork in the Road', sDialogue.forkInTheRoad, 'choice2', `Will you follow the coins or the hammer?`, forkInTheRoadChoices, null)

  // BOSS 3 : Troll
  const theTrollRolls = {
    attackPotential: { low: 48, high: 52 },
    lowRoll: new Roll(1, 'Poor Roll', 10, cDialogue.theTrollRolls1, [loot.falcon, loot.shimmeringVial], 10),
    medRoll: new Roll(2, 'Fair Roll', 5, cDialogue.theTrollRolls2, [loot.falcon], 10),
    highRoll: new Roll(3, 'Good Roll', 0, cDialogue.theTrollRolls3, [loot.falcon], 10)
  }

  const theTroll = new Scenario(9, null, `The Troll`, sDialogue.theTroll, 'roll', 'Roll to determine the fate of your battle', theTrollRolls, null);

  // BOSS 2 : Goblin
  const theGoblinRolls = {
    attackPotential: { low: 48, high: 52 },
    lowRoll: new Roll(1, 'Poor Roll', 10, cDialogue.theGoblinRolls1, [loot.strongBandages], 9),
    medRoll: new Roll(2, 'Fair Roll', 5, cDialogue.theGoblinRolls2, [loot.strongBandages], 9),
    highRoll: new Roll(3, 'Good Roll', 0, cDialogue.theGoblinRolls3, [loot.strongBandages], 9)
  }
  const theGoblin = new Scenario(7, null, 'The Goblin', sDialogue.theGoblin, 'roll', 'Roll to determine the fate of your battle', theGoblinRolls, null);

  // poisonous bite
  const thePoinsonousBite = new Scenario(8, null, 'The Poisonous Bite', sDialogue.thePoisonousBite, 'ready', null, null, 9);

  // the village
  const theVillageChoices = {
    choice1: new Choice(1, 'Yes, these villagers need your help!', cDialogue.theVillageChoices1, null, 7),
    choice2: new Choice(2, 'No, you have a more important mission ahead and can not afford to waste any time', cDialogue.theVillageChoices2, null, 8)
  }
  const theVillage = new Scenario(6, null, 'The Village', sDialogue.theVillage, 'choice2', `Will you risk your lives to help us with this other matter.`, theVillageChoices, null)

  // NPC 1
  const theWoodsmanLuck = {
    badLuck: new Luck(1, 'Poor Luck', cDialogue.theWoodsmanLuck1, null, 6),
    goodLuck: new Luck(2, 'Good Luck', cDialogue.theWoodsmanLuck2, [loot.herbalSalve], 6)
  }
  const theWoodsman = new Scenario(5, null, 'Find Another Way In', sDialogue.theWoodsman, 'luck', 'Since you were kind enough to carry wood back to the village the woodsman has much more than normal. Maybe if you are lucky he will reward you for your help. Roll for luck:', theWoodsmanLuck, null)


  // NPC 2
  const theOldFriend = new Scenario(4, null, 'The Old Friend', sDialogue.theOldFriend, 'ready2', null, null, 6);

  //BOSS 1 : Orc Lord
  const theOrcLordRoll = {
    attackPotential: { low: 40, high: 50 },
    lowRoll: new Roll(1, 'Poor Roll', 10, cDialogue.theOrcLordRoll1, null, 5),
    medRoll: new Roll(2, 'Fair Roll', 5, cDialogue.theOrcLordRoll2, [loot.orcLordMace], 4),
    highRoll: new Roll(3, 'Good Roll', 0, cDialogue.theOrcLordRoll3, [loot.orcLordMace], 4)
  }
  const theOrcLord = new Scenario(3, null, 'Battling the Orc Lord', sDialogue.theOrcLord, 'roll', 'roll the dice', theOrcLordRoll, null)


  // At the wall
  const atTheWallChoices = {
    choice1: new Choice(1, 'Battle the Orc', cDialogue.atTheWallChoices1, null, 3),
    choice2: new Choice(2, 'Go Around', cDialogue.atTheWallChoices2, null, 5)
  }

  const atTheWall = new Scenario(2, 'https://player.vimeo.com/video/492252064', 'At the Wall', sDialogue.atTheWall, 'choice2', `Your group stops to discuss your options…`, atTheWallChoices, null);


  // intro
  const intro = new Scenario(1, 'https://player.vimeo.com/video/492222948', 'Introduction', sDialogue.intro, 'ready', null, null, 2);

  return {
    intro,
    atTheWall,
    theOrcLord,
    theOldFriend,
    theWoodsman,
    theVillage,
    thePoinsonousBite,
    theGoblin,
    theTroll,
    forkInTheRoad,
    theMerchant,
    tinTown,
    curiosityKilledTheCat,
    neutralZone,
    ironForge,
    theBoisterousBaker,
    theShepherdsHouse,
    backToTheSmithy,
    theKingMaker,
    theRingAndTheRose,
    theWitch,
    theHydra,
    rebellion,
    cityAroundThePalace,
    hornedAnimal,
    wishingWell,
    mageSmith,
    theKingIntro,
    theKing1,
    theKing2,
    theKing3,
    gameOverDeath,
    gameOverHydra,
    gameOverKing,
    gameOverWin
  };

}

module.exports = createScenarios;

