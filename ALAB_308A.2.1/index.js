//part one

const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
  companion: {
    name: "Leo",
    type: "Cat",
    companion: {
        name:"Frank",
        type: "Flea",
        inventory: ["sunglasses", "small hat"]
    }
  },
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  },
};


adventurer.roll();



//part two

class Character {
    static MAX_HEALTH = 100;
    constructor(name){
        this.name = name;
        this.currentHealth = Character.MAX_HEALTH;
        this.inventory = [];
    }
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
      }

    gainHealth(){
        if(this.currentHealth+10>Character.MAX_HEALTH){
            console.log("OVER THE LIMIT");
        } else{
            this.currentHealth += 10;
            console.log(`Current health is ${this.currentHealth}`);
        }
    }
}



// const robin = new Character("Robin");
// robin.inventory = ["sword", "potion", "artifact"];
// robin.companion = new Character("Leo");
// robin.companion.type = "Cat";
// robin.companion.companion = new Character("Frank");
// robin.companion.companion.type = "Flea";
// robin.companion.companion.inventory = ["small hat", "sunglasses"];
// robin.roll();


//part three

class Adventurer extends Character {
    static ROLES = ["FIGHTER", "HEALER", "WIZARD", "EXPLORER"];
    constructor(name,role){
        super(name);
        this.role = Adventurer.ROLES.includes(role) ? "EXPLORER" : role.toUpperCase();
        this.inventory.push("bedroll", "50 gold coins");
        this.companion = [];
    }

    scout(){
        console.log(`${this.name} is scouting ahead...`);
        super.roll();
    }

    duel(adventurer){
      try{
        if(!(adventurer instanceof Adventurer)) throw "Fail to duel, this is not an adventurer."
        while(adventurer.currentHealth >= 50 && this.currentHealth >= 50){
          const yourRoll = super.roll();
          const opponentRoll = adventurer.roll();
          if(yourRoll > opponentRoll){
            adventurer.currentHealth -= 1;
            console.log(`=======================\nThe winner is ${this.name}! ${adventurer.name} takes -1 damage\n=======================`);
          } else{
            this.currentHealth -= 1;
            console.log(`=======================\nThe winner is ${adventurer.name}! ${this.name} takes -1 damage\n=======================`);
          }
          console.log(`${adventurer.name}'s current health: ${adventurer.currentHealth}\n=======================\n${this.name}'s current health: ${this.currentHealth}`);
        }
        if(adventurer.currentHealth < 50){
          console.log(`${this.name} wins the duel!`);
        } else{
          console.log(`${adventurer.name} wins the duel!`);
        }
      } catch(error){
        console.log(error);
      }
    }
}

class Companion extends Character {
    constructor(name, type){
        super(name);
        this.type = type;
        this.companion = [];
    }
}

const robin = new Adventurer("Robin", "fighter");
robin.inventory.push("sword", "potion", "artifact");

const leo = new Companion("Leo", "Cat");
const frank = new Companion("Frank", "Flea");
frank.inventory.push("small hat", "sunglasses");
// robin.roll();
leo.companion.push(frank);
// console.log(robin.currentHealth);
console.log(robin.role);


class AdventurerFactory {  
    constructor (role) {
      this.role = role;
      this.adventurers = [];
    }
    generate (name) {
      const newAdventurer = new Adventurer(name, this.role);
      this.adventurers.push(newAdventurer);
      return newAdventurer;
    }
    findByIndex (index) {
      return this.adventurers[index];
    }
    findByName (name) {
      return this.adventurers.find((a) => a.name === name);
    }
  }

  const healers = new AdventurerFactory("Healer");
  const bobo = healers.generate("Bobo");
  // console.log(healers);
  // console.log(bobo);
  // bobo.gainHealth();
  // console.log(bobo.currentHealth);
  bobo.duel(robin);
