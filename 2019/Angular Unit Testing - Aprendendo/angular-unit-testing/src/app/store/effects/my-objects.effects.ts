import { Injectable } from '@angular/core';
import { EffectsMetadata, Actions, Effect } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as myObjectsActions from './../actions/my-objects.action';

import * as fromServices from './../../services';

@Injectable()
export class MyObjectsEffects {
  constructor(
    private actions$: Actions,
    private myObjectService: fromServices.MyService
  ) {}

  // loadMyObjects$ = this.actions$.ofType(myObjectsActions.LOAD_MYOBJECTS).pipe(
  // switchMap( () => {
  //     return this.myObjectService.getMyObjects().pipe(
  //         map(myObjects => new myObjects.LoadMyObjectsSuccess(myObjects)),
  //         catchError(error => of(new myObjectsActions.LoadMyObjectsFail(error)))
  //     );
  // });
  // );

  // @Effect({ dispatch: false})
  @Effect()
  loadMyObjects$ = of(
    new myObjectsActions.LoadMyObjectsSuccess({
      someAttribute: 'qwert',
      anotherAttribute: 999
    })
  );
}
