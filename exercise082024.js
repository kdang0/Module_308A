class Animal {
	constructor(eyes, legs, isAwake, isMoving) {
		this.eyes = eyes;
    this.legs = legs;
    this.isAwake = isAwake;
    this.isMoving = isMoving;
	  // return is not needed because the new object is returned by default
	}
  sleep() {
    this.isAwake = false;
  }
  wake() {
    this.isAwake = true;
  }
  sit() {
    this.isMoving = false;
  }
  walk() {
    this.isMoving = true;
  }
  speak(sound) {
    console.log(sound);
  }
  toString(animal = 'Animal') {
    return `This ${animal} has ${this.eyes} eyes and ${this.legs} legs. It ${this.isAwake ? 'is' : 'is not'} awake, and ${this.isMoving ? 'is' : 'is not'} moving.`;
  }
}

class Human extends Animal{
    name = {
        first:'',
        last:''
    }

    location = {
        city: '',
        state: '',
        zip: ''
    }

    constructor(first, last, age, city, state, zip, occupation, isAwake, isMoving){
        super(2,2, isAwake, isMoving);
        this.name.first = first;
        this.name.last = last;
        this.age = age;
        this.location.city= city;
        this.location.state= state;
        this.location.zip=zip;
        this.occupation = occupation;
    }

    introduce() {
        console.log(`Hello, my name is ${this.name.first} ${this.name.last}, and I'm a ${this.age}-year-old ${this.occupation} from ${this.location.city}, ${this.location.state}!`)
    }
}

const Elyan = new Human('Elyan', 'Kemble', 21, 'Garland', 'Texas',parseInt('075040'),"Front-End Developer", true, true);
Elyan.introduce();
console.log(Elyan.location.zip);