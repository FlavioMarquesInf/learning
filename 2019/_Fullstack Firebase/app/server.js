
var admin = require("firebase-admin");

var serviceAccount = require("./.data/service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ynad-9d20f.firebaseio.com"
});

admin.database().ref('fake').once('value').then(snapshot => {
  console.log(snapshot.key);
});

