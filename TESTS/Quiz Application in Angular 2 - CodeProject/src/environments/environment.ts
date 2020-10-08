// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBy5qCdApAEKjhHTrJ1loz1LNtQMH2mhUs',
    authDomain: 'tinglew-app-test.firebaseapp.com',
    databaseURL: 'https://tinglew-app-test.firebaseio.com',
    projectId: 'tinglew-app-test',
    storageBucket: 'tinglew-app-test.appspot.com',
    messagingSenderId: '863331347859'
  },
  mapsKey: 'AIzaSyCOYIHjEV0iLDLw7jhNyr9ZWselkozAikU',
  schema: {
    socialEvents: 'test-social-events',
    socialEventImages: 'test-social-events-images',
    users: 'test-users',
    profileImages: 'test-user-profile-images',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
