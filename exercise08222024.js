class Library{
    constructor(buildingName, numberOfBooks){
        this.buildingName = buildingName;
        this.numberOfBooks = numberOfBooks;
    }

    greeting(){
        console.log(`Welcome to ${this.buildingName}`);
    }
}


const riverDaleLibrary = new Library('RiverDale Library', 25);
console.log(riverDaleLibrary);
riverDaleLibrary.greeting();

const yaleLibrary = new Library('Yale Library', 500000);
console.log(yaleLibrary);
yaleLibrary.greeting();

//Car Rental System
class RentalCompany{
    constructor(name, inventory, employees, location){
        this.name = name;
        this.inventory=  inventory;
        this.employees = employees;
        this.location = location;
    }
}

class Car{
    constructor(name, type, rates, status){
        this.name = name;
        this.type = type;
        this.rates = rates;
        this.status = status;
    }
}

class Customer{
    constructor(name, email, age, id){
        this.name = name;
        this.email = email;
        this.age = age;
        this.id = id;
    }
}

class Transaction{
    constructor(date, returnDate, incidental, customer, car, total){
        this.date = date;
        this.returnDate = returnDate;
        this.incidental = incidental;
        this.customer = customer;
        this.car = car;
        this.total = total;

    }
    calculateLateFee = () => {
        let currentDate = new Date();
        if(currentDate > this.returnDate){
            let numOfDays = this.returnDate - currentDate;
            this.total += numOfDays*50;
        }
    }

    calculateTotal = () => {
        if(this.customer.age < 25){
            this.car.rates += this.car.rates * 0.2; 
        }

        if(this.car.type.model === "SUV"){
            this.car.rates += this.car.rates * 0.2;
        }
        this.total = (this.returnDate - this.date) * this.car.rates; 
    }
}




