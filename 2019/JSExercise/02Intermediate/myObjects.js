let myArray = ['name', 33, true];

let myYoutubeVideo = {
    title: 'Loops in javascript',
    videoLength: 10,
    videoCreator: 'John Doe',
    videoDescription: 'this is a video description and a long one.'
};

let myYoutubeVideoOne = {
    title: 'For loops in javascript',
    videoLength: 15,
    videoCreator: 'John Doe',
    videoDescription: 'this is a video description and a long one.'
};

let myYoutubeVideoTwo = {
    title: 'Foreach loops in javascript',
    videoLength: 20,
    videoCreator: 'John Doe',
    videoDescription: 'this is a video description and a long one.'
};


// console.log(myYoutubeVideo);

// console.log(`Hey new Video on ${myYoutubeVideo.title} by ${myYoutubeVideo.videoCreator}`);

// -Exercise: create an object then log into console accessing props.
let myCourse = {
    name: 'Javascript',
    price: 62.99,
    author: 'Jane Doe'
}

console.log(`Hey, new course of ${myCourse.name} by ${myCourse.author} at $${myCourse.price}`);

// -Assignment

let changeVideoLength = function(myObject) {
    return {
        formatOne: `Time of this video is: ${myObject.videoLength + 2}`,
        formatTwo: `Time of this video is: ${myObject.videoLength + 1}`
    };
};

let time = changeVideoLength(myYoutubeVideoOne);
console.log(time.formatTwo);

