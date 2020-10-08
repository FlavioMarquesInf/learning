//datatype - Array

const superHeroes = ['Iron Man', 'Spiderman', 'Capt. America', 'thor']

console.log(superHeroes);
console.log(superHeroes[0]);
console.log(superHeroes[2]);
console.log(superHeroes[superHeroes.length - 1]);


superHeroes.forEach(hero => {
    console.log('hero', hero)
});

//Templating string
console.log(`We have ${superHeroes.length} super heroes`);



const numbers = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']

numbers[1] = 'something'

console.log(numbers);

//Start
console.log(numbers.shift());

numbers.unshift('Something')
console.log(numbers);


//End
console.log('The element to be deleted is: ' + numbers.pop());
console.log(numbers);

console.log('Pushed value: ', numbers.push('Seven'));
console.log(numbers);


//Middle
numbers.splice(2,1, 'SOMETHING')
console.log(numbers);
