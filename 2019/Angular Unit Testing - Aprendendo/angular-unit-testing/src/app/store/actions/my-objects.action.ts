import { Action } from '@ngrx/store';
import { MyObject } from '../../models/myobject.model';

// load my-object (action constants)
export const LOAD_MYOBJECTS = '[Products] Load MyObjects';
export const LOAD_MYOBJECTS_FAIL = '[Products] Load MyObjects Fail';
export const LOAD_MYOBJECTS_SUCCESS = '[Products] Load MyObjects Success';


// action creators
export class LoadMyObjects implements Action {
    readonly type = LOAD_MYOBJECTS;
}

export class LoadMyObjectsFail implements Action {
    readonly type = LOAD_MYOBJECTS_FAIL;
    constructor(public payload: any) { }
}

export class LoadMyObjectsSuccess implements Action {
    readonly type = LOAD_MYOBJECTS_SUCCESS;
    constructor(public payload: MyObject) {}
}


// action types
export type MyObjectsAction = LoadMyObjects | LoadMyObjectsFail | LoadMyObjectsSuccess;
