import { Injectable } from '@angular/core';
import { MyObject } from './../models/myobject.model';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MyService {

  constructor(http: any) { }

  getMyObjects(): Observable<MyObject[]> {
    const myObjectOne = {
      someAttribute: 'B',
      anotherAttribute: 2
    } as MyObject;

    const myObjectTwo = {
      someAttribute: 'C',
      anotherAttribute: 3
    } as MyObject;

    const myObjects = [
      myObjectOne,
      myObjectTwo
    ];

    return of(myObjects);

    // return this.http
    //   .get<MyObject[]>(`/api/pizzas`)
    //   .pipe(catchError((error: any) => Observable.throw(error.json)))
  }

  createMyObject(payload: MyObject): Observable<MyObject> {
    const myObjectThree = {
      someAttribute: 'C',
      anotherAttribute: 3
    } as MyObject;

    return of(myObjectThree);
    // return this.http
    //   .post<MyObject>(`/api/pizzas`, payload)
    //   .pipe(catchError((error: any) => Observable.throw(error.json())))
  }
}
