import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class LogProvider {

  constructor(private afDatabase: AngularFireDatabase) {
    console.log('-LogProvider init.');
    //this.log('Testing log 1');
    //this.log('Testing log 2');
  }

  log(message: string) {
    let userData = { uid:'-uid'}
    this.afDatabase.object(`log/${userData.uid}`).set({message: message});
  }
}
