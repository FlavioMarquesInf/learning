// const days = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']

// // days.forEach(function(day, index){
// //     console.log((index+1) + ' -', day);
// // })
// console.log('days.length', days.length);

// for(let index=0; index < days.length; ++index) {
//     console.log(index+1, days[index]);
// }

// for(let index=days.length-1; index > -1; index--) {
//     console.log(index+1, days[index]);
// }

const myTodos = [];

myTodos.push('Buy Bread');
myTodos.push('Record videos for youtube');
myTodos.push('Go to Gym');


// myTodos.forEach((todo, index) => {
//     console.log(`Your task nº${index+1} is: ${todo}`);
// });

//Exercício
//Mostrar a lista das tarefas na ordem inversa usando forLoop
for (let index = myTodos.length-1; index > -1; index--) {
    const element = myTodos[index];
    console.log(element);
}

myTodos.forEach(function(todo, index) {
    console.log(`Your task no. ${index + 1} is: ${todo}`);
});

