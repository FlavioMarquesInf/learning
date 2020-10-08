const myTodos = ['Buy Bread', 'Go toGym', 'Record youtube videos'];
// console.log(myTodos.indexOf('Buy Bread'));

const newTodos = [
    {
        title: 'Buy Bread',
        isDone: false,
    },
    {
        title: 'Go to Gym',
        isDone: false,
    },
    {
        title: 'Record youtube videos',
        isDone: true,
    },
];

// const index = newTodos.findIndex(function(todo, index) {

//     return todo.title === 'Go to Gym';
// });

// console.log(index);



// Method 1
// const findTodo = function(todos, title) {
//     const index = todos.findIndex(function(todo, index){
//         return todo.title.toLowerCase() === title.toLowerCase();
//     });
//     return todos[index];
// };

// let printMe = findTodo(newTodos, 'Go to gym');
// console.log(printMe);


// Method 2
const findTodo = function(todos, title) {
    const titleReturned = todos.find(function(todo, index){
        return todo.title.toLowerCase() === title.toLowerCase();
    });
    return titleReturned;
};

let printMe = findTodo(newTodos, 'Go to gym');
console.log(printMe);



