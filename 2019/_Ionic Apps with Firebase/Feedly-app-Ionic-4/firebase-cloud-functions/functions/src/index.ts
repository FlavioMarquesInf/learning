import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const cors = require('cors')({ origin: true, });

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const updateLikesCount = functions.https.onRequest((request, response) => {
    console.log(request.body);

    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    response.set('Content-Type', 'application/json');
    response.set('Accept', 'application/json');

    const postId = request.body.postId;
    const userId = request.body.userId;
    const action = request.body.action; // like or unlike

    return cors(request, response, () => {

        admin.firestore().collection('posts').doc(postId).get().then(data => {

            // OBS: a exclamação em "data.data()!" depois da função é para dizer ao TS que essa função existe mesmo que ele esteja lendo como "provavelmente nulo", usando a exclamação o lint do TS para de marcar como erro.
            let likesCount = data.data()!.likesCount || 0;
            // let likes = data.data()!.likes || [];

            const updateData: any = {};

            if (action === 'like') {
                updateData['likesCount'] = ++likesCount;
                updateData[`likes.${userId}`] = true;
            } else {
                updateData['likesCount'] = --likesCount;
                updateData[`likes.${userId}`] = false;
            }

            admin.firestore().collection('posts').doc(postId).update(updateData).then(() => {
                response.status(200).send('Done');
            }).catch(error => {
                response.status(error.code).send(error.message);
            });

        }).catch(error => {
            response.status(error.code).send(error.message);
        });
    });

});

export const updateCommentsCount = functions.firestore.document('comments/{commentId}').onCreate(async event => {

    const data = event.data();

    const postId = data!.post;

    const doc = await admin.firestore().collection('posts').doc(postId).get();

    if (doc.exists) {
        let commentsCount = doc.data()!.commentsCount || 0;
        commentsCount++;

        await admin.firestore().collection('posts').doc(postId).update({
            'commentsCount': commentsCount
        }).then(() => {
            console.log('commentsCountUpdated.');
        });

        return true;

    } else {
        return false;
    }
});