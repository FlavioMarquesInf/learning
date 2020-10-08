import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './../../models/user.model';

@Injectable()
export class UserService {

  constructor(
    //public afDb: AngularFireDatabase,
    public http: HttpClient
  ) {}

  create(user: User) {
    //return this.afDb.list(`/users`).push(user)
  }
}
