function LiveLinks() {
    this.firebase = firebase;
    var auth = firebase.auth();
    var database = firebase.database();
    var linksRef = database.ref('links');
    var usersRef = database.ref('users');
    var instance = this;

    this.submitLink = function (title, url) {
        url = url.substring(0, 4) !== 'http' ? 'http://' + url : url;
        linksRef.child(btoa(url)).update({
            title: title,
            url: url
        }, function(error) {
            if (error) {
            instance.onError(error);
        } else {
            linksRef.child(btoa(url))
                    .child('users')
                    .child(instance.auth.uid)
                    .set(true);
        }
        });
    };

    this.vote = function(voteId, voteVal) {
        linksRef.child(voteId)
                .child('votes')
                .child('instance.auth.uid')
                .set(voteVal);
    };

    this.login = function (email, password) {
        auth.signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.error('Error:',errorCode, errorMessage);
        });
    };

    this.signup = function(alias, email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.error('Error:', errorCode, errorMessage);
        }).then(function(userAuthData){
            console.log('userAuthData:', userAuthData);
            usersRef.child('userAuthData...uid')
                    .set('userAuthData...data');
            
                    
        });
    };
}

// function writeLinkData(linkId, title, url) {
//     database.ref('links/' + linkId).set({
//         title: title,
//         url: url,
//     }).then(function (res) {console.log('LinkData Stored!');});
// }

// var img = 'https://images.maskworld.com/is/image/maskworld/bigview/john-doe-foam-latex-mask--mw-117345-1.jpg';

// writeLinkData('1', 'Google', 'google.com');

// var linksRef = firebase.database().ref('links');

// linksRef.on('value', function(snapshot){
//     console.log('value: ', snapshot.val());
// });

// linksRef.on('child_added', function (snapshot) {
//     console.log('value added: ', snapshot.val());
// });

// linksRef.on('child_changed', function (snapshot) {
//     console.log('value changed: ', snapshot.val());
// });


// function submitLink(title, url) {
//     url = url.substring(0,4) !== 'http' ? 'http://' + url : url;
//     linksRef.child(btoa(url)).set({
//         title: title,
//         url: url
//     });
// }

// var onLinksChanged = function() {};
// linksRef.on('value', function(snapshot) {
//     var links = snapshot.val();
//     var preparedLinks = [];
//     for (var url in links) {
//         if (links.hasOwnProperty(url)) {
//             preparedLinks.push({
//                 title: links[url].title,
//                 url: atob(url)
//             });
//         }
//     }
//     onLinksChanged(preparedLinks);
// }.bind(this));




// $(document).ready(function () {
//     $(".link-form form").submit(function(){
//         event.preventDefault();
//         submitLink(
//             $(this).find('input.link-url').val(),
//             $(this).find('input.link-title').val()
//         );
//         $(this).find("input[type=text]").val('').blur();
//     });
// });





// var users = database.ref('users');
// users.child('1');
// users.set({alias: 'dangerousjane'});

// users.child('2');
// users.set([1,2,3,4,5,10]);
