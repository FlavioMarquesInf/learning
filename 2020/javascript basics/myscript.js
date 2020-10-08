let myName = "Flavio";
var oLike = "pizza";
const PI = 3.141;

let string = "this is a normal string";
let number = 42;
let bool = false;
let array = [1,2,3,"a", "b", "C"];

let _undefined = undefined;
let _null = null;
let _NaN = NaN;

let object = {
  keyname: "value"
};

// string
// number
// bool
// array[3] -> 4
// array[4] -> "a"
// object.keyname same as object["keyname"]
// object["key name"]

let myResult;

function myAwesomeFunction(myString = "default value") {
  return myString;
}

myResult = myAwesomeFunction();
console.log(myResult);

myResult = myAwesomeFunction('Abcdefgh');
console.log(myResult);
myResult = myAwesomeFunction(123456);
console.log(myResult);

myResult = myAwesomeFunction('12d3a1s3d');
console.log(myResult);

// ====================
// if - esle -witch = block statement
var myVariable = 100;
var myAge = 20;

if (myAge == 20) {
  var iWant = 'pizza';
}

console.log(myVariable);
console.log(myAge);
console.log(iWant);



// alert('Hello');
// let result = confirm('are you sure?');
// console.log(result);

// let promptResult = prompt('What is your name?');
// console.log(promptResult);

let obj = {
  keyname: 'value1',
  keyname2: 'value2',
  toBeRemoved: true
};

console.log(obj.keyname);
console.log(obj["keyname2"]);
obj.keyname = 'value3';

console.log(obj.keyname);
console.log(obj);

// =======================
let arr = ['Hello', 'world'];

arr['myKey'] = '!!';
console.log(arr);

// ======================
let number1 = 100;
let number2 = 200;

console.log('add: ', number1 + number2);
console.log('substract: ', number1 - number2);
console.log('multiply: ', number1 * number2);
console.log('divide: ', number1 / number2);
console.log('exponentiation: ', number1**2);
console.log('increment: ', ++number1);
console.log('decrement: ', --number1);

let myNumber = 42;

var num1 = (++myNumber) + (myNumber++);
var num2 = (myNumber++) + (++myNumber);

// 43 + 43 = 86
// 42 + 44 = 86

console.log(num1, num2);


// ====================
let arr1 = [1,2,3,4,5,6];
let arr2 = arr1.map(element => {
  return element * 2;
});

console.log('array map: ', arr2);

arr1.forEach(e => { console.log(e) });

const total = arr1.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log('total from reduce: ', total);

// ======================

let myFavFoods = ['pizza', 'burgers', 'pasta'];
console.log('indexOf("pizza") myFavFoods array', myFavFoods.indexOf("pizza"));

console.log('myFavFoods.includes("burgers"): ', myFavFoods.includes("burgers"));


let students = [
  {
    name: 'ABC',
    age: 15
  },
  {
    name: 'DEF',
    age: 16
  }
];

const student = students.find(s => {
  return s.age == 15;
})
console.log('students.find(age == 15)', student);

// ===================

// == vs ===
let a = 2;
let b = "2";

let c = [1,2,3];
let d = '1,2,3';

let e = [1,2,3];
let f = e;

console.log('will be false', a === b);
console.log('Will be true', c == d);
console.log('will be false, because is not the same memory location ', c === e);
console.log('will be true, is the same memory location', e === f);

// 1. Check types
// 2. If type is not same, and operator is === -> return false;
// 3. If type is not same, and operator is -- -> cnahge type
// 4. Compare the values (type is now same)

// triple equals are always recomended!


// ===============================================
// window, document
// alert();
console.log('alert in window', 'alert' in window);

let myObj = {a: 1, b: 2};
console.log("'a' in myObj", 'a' in myObj);
console.dir('document: ', document);
console.log('window.document', window.document);
let title = document.getElementById('title').innerText;
console.log('title text: ', title);

setTimeout(() => {
  document.getElementById('title').innerText = 'Bye bye!'
}, 2000);

// ==========================
let selectors  = document.getElementsByClassName('name');
console.log('selectors[0]: ', selectors[0]);

setTimeout(() => {
  selectors[0].innerText = 'Ciclano';
}, 2000);

let elements = document.getElementsByTagName('span');
console.log('elements: ', elements);

setTimeout(() => {
  elements[0].innerText = 'now'
}, 2500);

document.getElementsByTagName('head')[0].getElementsByTagName('title')[0].innerText = 'WOW!';

let i = 0;

let id = setInterval(() => {
  document.getElementById('counter').innerText = ++i;

  if (i === 5) {
    clearInterval(id);
  }
}, 1000);

// ===========================
const elem = document.getElementById('action');
elem.onclick = () => {
  console.log('div clicked');
}

function changeTitleText() {
  document.getElementById('title').textContent = 'Uaiii';
  console.log('title clicked');
  
}

// ==============================
let j = 0;

try {
  if (j == 0) {
    throw 'j cannot be zero';
  }
} catch (error) {
  console.error(error);
}

console.log('nice little statement, executed after the trycatch block');
