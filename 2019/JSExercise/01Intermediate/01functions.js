let sayHello = function (name) {
    console.log('Greeting message for ' + name);
    console.log(`Hey ${name}`);
};

//sayHello('John')

let fullNameMaker = function (firstName, lastName) {
    console.log('Welcome to LCO')
    console.log(`Happy to have you, ${firstName} ${lastName}`)
}

//fullNameMaker('John', 'Doe')

let myAdder = function (number1, number2) {
    let added = number1 + number2
    return added
}

let result = myAdder(5, 3)
console.log('SUM:', result);

let myMultiplier = function (num1, num2) {
    return num1 * num2
}

let multiplicationResult = myMultiplier(2,5)
console.log('MULT:',multiplicationResult);

//Default paramiter assignment
let guestUser = function(name = 'unName', courseCount = 0) {
    return `Hello ${name} and your course count is: ${courseCount}.`
}

console.log(guestUser('John', 5));
