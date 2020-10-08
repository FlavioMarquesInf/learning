let iAmGlobal = 'someValue'

if (true) {
    let iAmLocal = 'someMoreValue'
    console.log(iAmGlobal)
    console.log(iAmLocal);
}

//console.log(iAmLocal); //throw an error
//OBS: Not use the var keyword, its global, use let instead

//=================================================================
//kings teritory problem
let king = 'John'

if (true) {
    let king = 'Sam'

    if (true) {
        let king = "Ram";
        console.log(king);
    }
}

if (true) {
    console.log('second part ', king);
}
