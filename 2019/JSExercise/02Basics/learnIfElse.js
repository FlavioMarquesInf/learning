if (Math.random()<0.5) {
    console.log('Inside If Block')
} else if(true) {
    console.log('Inside seccond If Block')
} else {
    console.log('Inside Else Block')
}


let whoIsHere = 'user';

if (whoIsHere === 'user') {
    console.log('whoIsHere', whoIsHere);
} else if (whoIsHere === 'teacher') {
    console.log('whoIsHere', whoIsHere);
} else {
    console.log('Verify your email');
}

//============================
// Exercício
// Grade Problem
// students marks:

// 10 - Amazing
// 5 - Good
// 3 - Poor
// 0 - Fail

let studentGrade = 10

if (studentGrade === 10) {
    console.log('Amazing');
} else if (studentGrade === 5) {
    console.log('Good');
} else if (studentGrade === 3) {
    console.log('Poor');
}else if (studentGrade === 0) {
    console.log('Fail');
}