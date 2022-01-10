// Iteration 1: Soldier
//1. Modify the Soldier class and add 2 methods to it: attack(), and receiveDamage().
class Soldier {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }

  attack() {
    return this.strength;
  }

  receiveDamage(damage) {
    this.health = this.health - damage;
  }
}

// Iteration 2: Vikings
// A Viking is a Soldier with an additional property, their name
// Modify the Viking class, have it inherit from Soldier, re-implement the receiveDamage() method for Viking, and add a new battleCry() method.
class Viking extends Soldier {
  constructor(name, health, strength) {
    super(health, strength);

    this.name = name;
  }

  receiveDamage(damage) {
    this.health = this.health - damage;

    if (this.health > 0) {
      return `${this.name} has received ${damage} points of damage`;
    } else {
      return `${this.name} has died in act of combat`;
    }
  }

  battleCry() {
    return 'Odin Owns You All!';
  }
}

// Iteration 3: Saxon
// Modify the Saxon, constructor function, have it inherit from Soldier and re-implement the receiveDamage() method for Saxon.
class Saxon extends Soldier {
  constructor(health, strength) {
    super(health, strength);
  }

  receiveDamage(damage) {
    this.health = this.health - damage;

    if (this.health > 0) {
      return `A Saxon has received ${damage} points of damage`;
    } else {
      return `A Saxon has died in combat`;
    }
  }
}

// BONUS
// War
class War {
  // Our War class will allow us to have a Viking army and a Saxon army that battle each other.
  // add 5 methods to its class: addViking(), addSaxon(), vikingAttack(), saxonAttack()
  constructor() {
    this.vikingArmy = []; // the armies will start as empty array. These are attributes of the War class.
    this.saxonArmy = []; // same as above
  }

  // to add a viking, simply push the viking being passed as an argument to the vikingArmy attribute
  addViking(viking) {
    this.vikingArmy.push(viking);
  }

  // same as above for saxons
  addSaxon(saxon) {
    this.saxonArmy.push(saxon);
  }

  // method for a random viking to attack a random saxon
  vikingAttack() {
    // the following 3 lines are to determine a random viking within the vikingArmy array
    const randomVikingNumber = Math.random() * this.vikingArmy.length;
    const randomVikingIndex = Math.floor(randomVikingNumber);
    const randomViking = this.vikingArmy[randomVikingIndex];

    // same as above but for a random saxon from the saxonArmy array
    const randomSaxonNumber = Math.random() * this.saxonArmy.length;
    const randomSaxonIndex = Math.floor(randomSaxonNumber);
    const randomSaxon = this.saxonArmy[randomSaxonIndex];

    // below we want to call the receiveDamage method of the saxon with the strength of the viking
    // receiveDamage(): will reduce the health of a saxon why whatever number is passed as a parameter. See the methods of the Saxon class.
    // attack(): will hold the strength value of the viking. See the methods in the Viking class.
    // IMPORTANT: we save the result inside a variable because we want to return at the end of the function, but we also need to run it BEFORE we check for dead saxons.
    const result = randomSaxon.receiveDamage(randomViking.attack());

    // now we want to check if the saxon died and if he did, remove it from the array

    // One way, iterate over the whole array to check if any saxon died
    //   this.saxonArmy.forEach((saxon, i) => {
    //     if (saxon.health <= 0) {
    //       this.saxonArmy.splice(i, 1);
    //     }
    //   });

    // Better approach, target the saxon that received damage. check if it died.
    // randomSaxon is the saxon that received damage. randomSaxonIndex is its index.
    if (randomSaxon.health <= 0) {
      this.saxonArmy.splice(randomSaxonIndex, 1);
    }

    return result;
  }

  saxonAttack() {
    // exact same approach as before. just for one saxon attacking a viking.
    const randomVikingNumber = Math.random() * this.vikingArmy.length;
    const randomVikingIndex = parseInt(Math.floor(randomVikingNumber));
    const randomViking = this.vikingArmy[randomVikingIndex];

    const randomSaxonNumber = Math.random() * this.saxonArmy.length;
    const randomSaxonIndex = parseInt(Math.floor(randomSaxonNumber));
    const randomSaxon = this.saxonArmy[randomSaxonIndex];

    const result = randomViking.receiveDamage(randomSaxon.attack());

    if (randomViking.health <= 0) {
      this.vikingArmy.splice(randomVikingIndex, 1);
    }

    return result;
  }

  // SUPER BONUS - Iteration 5
  // showStatus() method
  // below is simply returning a string depending on if any array is empty or not.
  showStatus() {
    if (this.vikingArmy.length <= 0) {
      return 'Saxons have fought for their lives and survived another day...';
    } else if (this.saxonArmy.length <= 0) {
      return 'Vikings have won the war of the century!';
    } else {
      return 'Vikings and Saxons are still in the thick of battle.';
    }
  }
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = { Soldier, Viking, Saxon, War };
}
