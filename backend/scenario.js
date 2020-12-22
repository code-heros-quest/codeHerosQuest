'use strict';

function createScenarios(sDialogue, cDialogue, loot) {
  class Choice {
    constructor(num,video, name, dialogue, lootObject, next) {
      this.num = num;
      this.video = video;
      this.name = name;
      this.dialogue = dialogue;
      this.lootObject = lootObject;
      this.next = next;
    }
  }

  class Riddle {
    constructor(num, video, correct, name, dialogue, lootObject, next) {
      this.num = num;
      this.video = video;
      this.correct = correct;
      this.name = name;
      this.dialogue = dialogue;
      this.lootObject = lootObject;
      this.next = next;
    }
  }

  class Roll {
    constructor(num, video, name, damage, dialogue, lootObject, next) {
      this.num = num;
      this.video = video;
      this.name = name;
      this.damage = damage;
      this.dialogue = dialogue;
      this.lootObject = lootObject;
      this.next = next;
    }
  }

  class Luck {
    constructor(num, video, name, dialogue, lootObject, next) {
      this.num = num;
      this.video = video;
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
  }

  // Scenarios in reverse order, choices first
  // Game Over - death
  const gameOverDeath = new Scenario(35, './images/sceneImages/gameOverDeath.jpg', 'GAME OVER', sDialogue.gameOverDeath, 'none', null, null, null);

  // Game Over - hydra
  const gameOverHydra = new Scenario(34, './images/sceneImages/gameOverHydra.jpg', 'GAME OVER', sDialogue.gameOverHydra, 'none', null, null, null);

  const gameOverKing = new Scenario(33, './images/sceneImages/gameOverKing.jpg', 'GAME OVER', sDialogue.gameOverKing, 'none', null, null, null);

  const gameOverWin = new Scenario(32, './images/sceneImages/gameOverWin.jpg', 'GAME OVER', sDialogue.gameOverWin, 'none', null, null, null)

  // BOSS 5 : THE KING
  // fight three
  const theKing3Rolls = {
    attackPotential: { low: 50, high: 84 },
    lowRoll: new Roll(1, './images/sceneImages/theKingCloseCombat.jpg', 'Poor Roll', null, cDialogue.theKing3Rolls1, null, 35),
    medRoll: new Roll(2, './images/sceneImages/theKingCloseCombat.jpg', 'Fair Roll', null, cDialogue.theKing3Rolls2, null, 32),
    highRoll: new Roll(3, './images/sceneImages/theKingCloseCombat.jpg', 'Good Roll', null, cDialogue.theKing3Rolls3, null, 32)
  }

  const theKing3 = new Scenario(31, './images/sceneImages/theKingCloseCombat.jpg', 'Close Combat', sDialogue.theKing3, 'roll', 'Roll to see if you survived the battle', theKing3Rolls, null)

  // fight two
  const theKing2Rolls = {
    attackPotential: { low: 50, high: 84 },
    lowRoll: new Roll(1, './images/sceneImages/theKingRangeBattle.jpg', 'Poor Roll', cDialogue.theKing2Rolls1, null, 33),
    medRoll: new Roll(2, './images/sceneImages/theKingRangeBattle.jpg', 'Fair Roll', 5, cDialogue.theKing2Rolls2, null, 31),
    highRoll: new Roll(3, './images/sceneImages/theKingRangeBattle.jpg', 'Good Roll', 2, cDialogue.theKing2Rolls2, null, 31)
  }

  const theKing2 = new Scenario(30, './images/sceneImages/theKingRangeBattle.jpg', 'Ranged Battle', sDialogue.theKing2, 'roll', `Roll to see the outcome of your first engagement with the King`, theKing2Rolls, null);

  // fight one
  const theKing1Riddle = {
    riddle1: new Riddle(1, './images/sceneImages/theKingRiddle.jpg', null, 'Wrong Answer', cDialogue.theKing1Riddle1, null, 30),
    riddle2: new Riddle(2, './images/sceneImages/theKingRiddle.jpg', ['nothing'], 'Correct Answer', cDialogue.theKing1Riddle2, null, 30),
    riddle3: new Riddle(3, './images/sceneImages/theKingRiddle.jpg', null, 'Group Loss', cDialogue.theKing1Riddle3, null, 33),
    riddle4: new Riddle(4, './images/sceneImages/theKingRiddle.jpg', null, 'Group Win', cDialogue.theKing1Riddle4, null, 30),
  }
  const theKing1 = new Scenario(29, './images/sceneImages/theKingRiddle.jpg', 'Battle of Wits', sDialogue.theKing1, 'riddle', 'What a poor man has, a rich man wants, and if you eat it you die. What am I?', theKing1Riddle, null);

  // the king intro
  const theKingIntro = new Scenario(28, './images/sceneImages/theKing.jpg', 'The King', sDialogue.theKingIntro, 'ready2', null, null, 29);

  // NPC 6 : Mage-Smith
  const mageSmithChoices = {
    choice1: new Choice(1, './images/sceneImages/theMageSmith.jpg', 'Hush him', cDialogue.mageSmithChoices1, [loot.mightyEnchantedSword], 28),
    choice2: new Choice(2, './images/sceneImages/theMageSmith.jpg', 'Match Him', cDialogue.mageSmithChoices2, [loot.mightyEnchantedSword], 28),
    choice3: new Choice(3, './images/sceneImages/theMageSmith.jpg', 'Walk Away', cDialogue.mageSmithChoices3, [loot.mysteriousSword], 28)
  }
  const mageSmith = new Scenario(27, './images/sceneImages/theMageSmith.jpg', 'The Mage-Smith', sDialogue.mageSmith, 'choice3', `While it is a comical sight you are trying to avoid drawing attention to yourselves and you need to calm him down. Do you:`, mageSmithChoices, null);


  // wishing well ******
  const wishingWellLuck = {
    badLuck: new Luck(1, './images/sceneImages/wishingWell.jpg', 'Bad Luck', cDialogue.wishingWellLuck1, null, 27),
    goodLuck: new Luck(2, './images/sceneImages/wishingWell.jpg', 'Good Luck', cDialogue.wishingWellLuck2, [loot.blessedWater], 27)
  }

  const wishingWell = new Scenario(26, './images/sceneImages/wishingWell.jpg', 'Wishing Well', sDialogue.wishingWell, 'luck', `You hope for luck as you fall asleep`, wishingWellLuck, null);

  // horned animal
  const hornedAnimalChoices = {
    choice1: new Choice(1, './images/sceneImages/HornedAnimalTavern.jpg', 'Visit a Sprite', cDialogue.hornedAnimalChoices1, null, 26),
    choice2: new Choice(2, './images/sceneImages/HornedAnimalTavern.jpg', 'To the castle', cDialogue.hornedAnimalChoices2, null, 27)
  }
  const hornedAnimal = new Scenario(25, './images/sceneImages/HornedAnimalTavern.jpg', 'The Horned Animal', sDialogue.hornedAnimal, 'choice2', `You know that water sprites can grant great blessings, will you detour from your path to visit the sprite?`, hornedAnimalChoices, null)

  // city before the palace
  const cityChoices = {
    choice1: new Choice(1, './images/sceneImages/cityAroundTheWall.jpg', 'Circus Troupe', cDialogue.cityChoices1, null, 25),
    choice2: new Choice(2, './images/sceneImages/cityAroundTheWall.jpg', 'Minstrals', cDialogue.cityChoices2, null, 25),
    choice3: new Choice(3, './images/sceneImages/cityAroundTheWall.jpg', 'Monk Brotherhood', cDialogue.cityChoices3, null, 25)
  }

  const cityAroundThePalace = new Scenario(24, './images/sceneImages/cityAroundTheWall.jpg', 'Palace City', sDialogue.cityAroundThePalace, 'choice3', 'What kind of disguise do you think you should use?', cityChoices, null)

  // NPC 5 : Rebellion
  const rebellionLuck = {
    badLuck: new Luck(1, './images/sceneImages/Rebellion.jpg', 'Poor Luck', cDialogue.rebellionLuck1, [loot.brittleHeirloomBow, loot.rebelBandagesSmall, loot.rebelBandagesLarge], 24),
    goodLuck: new Luck(2, './images/sceneImages/Rebellion.jpg', 'Good Luck', cDialogue.rebellionLuck2, [loot.strongHeirloomBow, loot.rebelBandagesSmall, loot.rebelBandagesLarge], 24)
  }
  const rebellion = new Scenario(23, './images/sceneImages/Rebellion.jpg', 'Rebellion', sDialogue.rebellion, 'luck', `flip for a chance to add your luck to the enchantress' spell`, rebellionLuck, null);


  // BOSS 4 : Hydra

  const theHydraRolls = {
    attackPotential: { low: 50, high: 68 },
    lowRoll: new Roll(1, './images/sceneImages/theHydra.jpg', 'Poor Roll', 20, cDialogue.theHydraRolls1, null, 23),
    medRoll: new Roll(2, './images/sceneImages/theHydra.jpg', 'Fair Roll', 9, cDialogue.theHydraRolls2, null, 23),
    highRoll: new Roll(3, './images/sceneImages/theHydra.jpg', 'Good Roll', 5, cDialogue.theHydraRolls3, null, 23)
  }

  const theHydra = new Scenario(22, './images/sceneImages/theHydra.jpg', 'TheHydra', sDialogue.theHydra, 'roll', 'Roll the dice to determine the fate of your battle', theHydraRolls, null);

  // NPC 4 : Witch
  const theWitchRiddle = {
    riddle1: new Riddle(1, './images/sceneImages/theWitch.jpg', null, 'Wrong Answer', cDialogue.theWitchRiddle1, null, 22),
    riddle2: new Riddle(2, './images/sceneImages/theWitch.jpg', ['a skull', 'skull'], 'Correct Answer', cDialogue.theWitchRiddle2, [loot.strengthSpell], 22),
    riddle3: new Riddle(3, './images/sceneImages/theWitch.jpg', null, 'Group Loss', cDialogue.theWitchRiddle3, null, 22),
    riddle4: new Riddle(4, './images/sceneImages/theWitch.jpg', null, 'Group Win', cDialogue.theWitchRiddle4, [loot.gnarledStaff], 22)
  }

  const theWitch = new Scenario(21, './images/sceneImages/theWitch.jpg', 'The Witch', sDialogue.theWitch, 'riddle', `“I don’t have eyes, But once I did see. I once had thoughts, Now white and empty. What am I?”`, theWitchRiddle, null);

  // theRingAndTheRose
  const theRingAndTheRoseChoice = {
    choice1: new Choice(1, './images/sceneImages/ringAndTheRose.jpg', 'Warrior & Assasin', cDialogue.theRingAndTheRoseChoice1, null, 21),
    choice2: new Choice(2, './images/sceneImages/ringAndTheRose.jpg', 'Wizard & Warrior', cDialogue.theRingAndTheRoseChoice2, [loot.roseLocket], 21),
    choice3: new Choice(3, './images/sceneImages/ringAndTheRose.jpg', 'Assasin & Hunter', cDialogue.theRingAndTheRoseChoice3, [loot.enchantedRing], 21),
    choice4: new Choice(4, './images/sceneImages/ringAndTheRose.jpg', 'Hunter & Wizard', cDialogue.theRingAndTheRoseChoice4, [loot.roseLocket, loot.enchantedRing], 21)
  };

  const theRingAndTheRose = new Scenario(20, './images/sceneImages/ringAndTheRose.jpg', 'Ring and the Rose', sDialogue.theRingAndTheRose, 'choice4', 'You may only select two members of your party to be tested for these items, who will you choose?', theRingAndTheRoseChoice, null);

  // theKingMaker
  const theKingMakerChoices = {
    choice1: new Choice(1, './images/sceneImages/theKingMaker.jpg', `Don't tell him`, cDialogue.theKingMakerChoices1, null, 21),
    choice2: new Choice(2, './images/sceneImages/theKingMaker.jpg', 'Tell of your quest', cDialogue.theKingMakerChoices2, null, 20)
  }
  const theKingMaker = new Scenario(19, './images/sceneImages/theKingMaker.jpg', 'The King Maker', sDialogue.theKingMaker, 'choice2', `Do you tell him of your quest to kill the King?`, theKingMakerChoices, null)

  // backToTheSmithy 
  const backToTheSmithyChoices = {
    choice1: new Choice(1, './images/sceneImages/toTheSmithy.jpg', `No, don't bring it up`, cDialogue.backToTheSmithyChoices1, [loot.improvedArmor], 21),
    choice2: new Choice(2, './images/sceneImages/toTheSmithy.jpg', `Yes, ask him`, cDialogue.backToTheSmithyChoices2, [loot.improvedArmor], 19)
  }
  const backToTheSmithy = new Scenario(18, './images/sceneImages/toTheSmithy.jpg', 'To the Smithy', sDialogue.backToTheSmithy, 'choice2', 'Do you ask him about the broadsword?', backToTheSmithyChoices, null)

  // theShepherdsHouse
  const theShepherdsHouse = new Scenario(17, './images/sceneImages/TheSheperdsHouse.jpg', `Shepherd's House`, sDialogue.theShepherdsHouse, 'ready2', null, null, 18);

  // theBoisterousBaker

  const theBoisterousBaker = new Scenario(16, './images/sceneImages/theBoisterousBaker_.jpg', 'Boisterous Baker', sDialogue.theBoisterousBaker, 'ready2', null, null, 18)


  // Iron Forge ***********
  const ironForgeChoices = {
    choice1: new Choice(1, './images/sceneImages/ironForge.jpg', 'Look for cloth', cDialogue.theIronForgeChoices1, [loot.woolBandages], 17),
    choice2: new Choice(2, './images/sceneImages/ironForge.jpg', 'Look for food', cDialogue.theIronForgeChoices2, [loot.travelRations], 16)
  }

  const ironForge = new Scenario(15, './images/sceneImages/ironForge.jpg', 'Iron Forge', sDialogue.ironForge, 'choice2', `What supplies do you want to ask for?`, ironForgeChoices, null);

  // neutralGround *******
  const neutralZoneLuck = {
    badLuck: new Luck(1, './images/sceneImages/theNeutralZone.jpg', 'Poor Luck', cDialogue.neutralZoneLuck1, null, 21),
    goodLuck: new Luck(2, './images/sceneImages/theNeutralZone.jpg', 'Good Luck', cDialogue.neutralZoneLuck2, [loot.tinTownBandages], 21)
  }

  const neutralZone = new Scenario(14, './images/sceneImages/theNeutralZone.jpg', 'Neutral Zone', sDialogue.neutralZone, 'luck', 'Flip three coins for a chance to purchase supplies', neutralZoneLuck, null);



  // curiosityKilledTheCat *********
  const curiosityKilledTheCatChoices = {
    choice1: new Choice(1, './images/sceneImages/curiosity.jpg', 'Find Neutal Zone', cDialogue.curiosityChoices1, null, 14),
    choice2: new Choice(2, './images/sceneImages/curiosity.jpg', 'Leave Town', cDialogue.curiosityChoices2, null, 21)
  }

  const curiosityKilledTheCat = new Scenario(13, './images/sceneImages/curiosity.jpg', 'Curiosity', sDialogue.curiosityKilledTheCat, 'choice2', `Do you head to the Neutral Zone or leave town?`, curiosityKilledTheCatChoices, null);


  // Tin Town ************
  const tinTownChoices = {
    choice1: new Choice(1, './images/sceneImages/TinTown.jpg', 'Explore', cDialogue.tinTownChoices1, null, 14),
    choice2: new Choice(2, './images/sceneImages/TinTown.jpg', 'Learn More', cDialogue.tinTownChoices2, null, 13),
    choice3: new Choice(3, './images/sceneImages/TinTown.jpg', 'Leave Town', cDialogue.tinTownChoices3, null, 21)
  };

  const tinTown = new Scenario(12, './images/sceneImages/TinTown.jpg', 'Tin Town', sDialogue.tinTown, 'choice3', `Do you head further in seeking supplies, try to get more information before deciding, or cut your losses and follow the road winding south-east out of here?`, tinTownChoices, null);


  // NPC 3 : Merchant
  const theMerchantRiddle = {
    riddle1: new Riddle(1, './images/sceneImages/Merchant.jpg', null, 'Wrong Answer', cDialogue.theMerchantRiddle1, null, 12),
    riddle2: new Riddle(2, './images/sceneImages/Merchant.jpg', ['footsteps', 'foot steps'], 'Correct Answer', cDialogue.theMerchantRiddle2, [loot.poisonousBerries, loot.sheild, loot.hoodAndJesses, loot.magicalAmulet], 12),
    riddle3: new Riddle(3, './images/sceneImages/Merchant.jpg', null, 'Group Loss', cDialogue.theMerchantRiddle3, null, 12),
    riddle4: new Riddle(4, './images/sceneImages/Merchant.jpg', null, 'Group Win', cDialogue.theMerchantRiddle4, null, 12),

  }

  const theMerchant = new Scenario(11, './images/sceneImages/Merchant.jpg', 'The Merchant', sDialogue.theMerchant, 'riddle', `"The more you take, the more you leave behind. What am I?"`, theMerchantRiddle, null);

  // FORK IN THE ROAD *****
  const forkInTheRoadChoices = {
    choice1: new Choice(1, './images/sceneImages/forkInTheRoad.jpg', 'To the Coins', cDialogue.forkInTheRoad1, null, 11),
    choice2: new Choice(2, './images/sceneImages/forkInTheRoad.jpg', 'To the Hammer', cDialogue.forkInTheRoad2, null, 15)
  };

  const forkInTheRoad = new Scenario(10, './images/sceneImages/forkInTheRoad.jpg', 'Fork in the Road', sDialogue.forkInTheRoad, 'choice2', `Will you follow the coins or the hammer?`, forkInTheRoadChoices, null)

  // BOSS 3 : Troll
  const theTrollRolls = {
    attackPotential: { low: 48, high: 52 },
    lowRoll: new Roll(1, './images/sceneImages/TrollBridge.jpg', 'Poor Roll', 8, cDialogue.theTrollRolls1, [loot.falcon, loot.shimmeringVial], 10),
    medRoll: new Roll(2, './images/sceneImages/TrollBridge.jpg', 'Fair Roll', 4, cDialogue.theTrollRolls2, [loot.falcon, loot.shimmeringVial], 10),
    highRoll: new Roll(3, './images/sceneImages/TrollBridge.jpg', 'Good Roll', 0, cDialogue.theTrollRolls3, [loot.falcon, loot.shimmeringVial], 10)
  }

  const theTroll = new Scenario(9, './images/sceneImages/TrollBridge.jpg', `The Troll`, sDialogue.theTroll, 'roll', 'Roll to determine the fate of your battle', theTrollRolls, null);

  // BOSS 2 : Goblin
  const theGoblinRolls = {
    attackPotential: { low: 48, high: 52 },
    lowRoll: new Roll(1, './images/sceneImages/TheGoblins.jpg', 'Poor Roll', 8, cDialogue.theGoblinRolls1, [loot.strongBandages], 9),
    medRoll: new Roll(2, './images/sceneImages/TheGoblins.jpg', 'Fair Roll', 4, cDialogue.theGoblinRolls2, [loot.strongBandages], 9),
    highRoll: new Roll(3, './images/sceneImages/TheGoblins.jpg', 'Good Roll', 0, cDialogue.theGoblinRolls3, [loot.strongBandages], 9)
  }
  const theGoblin = new Scenario(7, './images/sceneImages/TheGoblins.jpg', 'The Goblin', sDialogue.theGoblin, 'roll', 'Roll to determine the fate of your battle', theGoblinRolls, null);

  // poisonous bite
  const thePoinsonousBite = new Scenario(8, './images/sceneImages/bite.jpg', 'The Poisonous Bite', sDialogue.thePoisonousBite, 'ready2', null, null, 9);

  // the village
  const theVillageChoices = {
    choice1: new Choice(1, './images/sceneImages/theVillage.jpg', 'Yes, help them', cDialogue.theVillageChoices1, null, 7),
    choice2: new Choice(2, './images/sceneImages/theVillage.jpg', 'No, be on your way', cDialogue.theVillageChoices2, null, 8)
  }
  const theVillage = new Scenario(6, './images/sceneImages/theVillage.jpg', 'The Village', sDialogue.theVillage, 'choice2', `Will you risk your lives to help us with this other matter.`, theVillageChoices, null)

  // NPC 1
  const theWoodsmanLuck = {
    badLuck: new Luck(1, './images/sceneImages/theWoodsman.jpg', 'Poor Luck', cDialogue.theWoodsmanLuck1, null, 6),
    goodLuck: new Luck(2, './images/sceneImages/theWoodsman.jpg', 'Good Luck', cDialogue.theWoodsmanLuck2, [loot.herbalSalve], 6)
  }
  const theWoodsman = new Scenario(5, './images/sceneImages/theWoodsman.jpg', 'The Woodsman', sDialogue.theWoodsman, 'luck', 'Since you were kind enough to carry wood back to the village the woodsman has much more than normal. Maybe if you are lucky he will reward you for your help. Roll for luck:', theWoodsmanLuck, null)


  // NPC 2
  const theOldFriend = new Scenario(4, './images/sceneImages/oldFriend.jpg', 'The Old Friend', sDialogue.theOldFriend, 'ready2', null, null, 6);

  //BOSS 1 : Orc Lord
  const theOrcLordRoll = {
    attackPotential: { low: 40, high: 50 },
    lowRoll: new Roll(1, './images/sceneImages/orcLordBattle.jpg', 'Poor Roll', 6, cDialogue.theOrcLordRoll1, null, 5),
    medRoll: new Roll(2, './images/sceneImages/orcLordBattle.jpg', 'Fair Roll', 3, cDialogue.theOrcLordRoll2, [loot.orcLordMace], 4),
    highRoll: new Roll(3, './images/sceneImages/orcLordBattle.jpg', 'Good Roll', 0, cDialogue.theOrcLordRoll3, [loot.orcLordMace], 4)
  }
  const theOrcLord = new Scenario(3, './images/sceneImages/orcLordBattle.jpg', 'Orc Lord Battle', sDialogue.theOrcLord, 'roll', 'roll the dice', theOrcLordRoll, null)


  // At the wall
  const atTheWallChoices = {
    choice1: new Choice(1, './images/sceneImages/atTheWall.jpg', 'Battle the Orc', cDialogue.atTheWallChoices1, null, 3),
    choice2: new Choice(2, './images/sceneImages/atTheWall.jpg', 'Go Around', cDialogue.atTheWallChoices2, null, 5)
  }

  const atTheWall = new Scenario(2, './images/sceneImages/atTheWall.jpg', 'At the Wall', sDialogue.atTheWall, 'choice2', `Your group stops to discuss your options…`, atTheWallChoices, null);


  // intro
  const intro = new Scenario(1, './images/intro.mp4', 'Introduction', sDialogue.intro, 'ready', null, null, 2);

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

