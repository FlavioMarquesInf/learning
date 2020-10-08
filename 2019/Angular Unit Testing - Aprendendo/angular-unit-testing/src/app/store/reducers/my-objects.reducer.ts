import { MyObjectsState } from './my-objects.reducer';
import { MyObject } from './../../models/myobject.model';
import * as fromMyObjects from '../actions/my-objects.action';

export interface MyObjectsState {
    // data: MyObject[];
    entities: {[id: number]: MyObject};
    loaded: boolean;
    loading: boolean;
}

export const initialState: MyObjectsState = {
    // data: [
        // {
        //     someAttribute: 'asd',
        //     anotherAttribute: 8
        // }
    // ],
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromMyObjects.MyObjectsAction
): MyObjectsState {
    switch (action.type) {
        case fromMyObjects.LOAD_MYOBJECTS: {
            return {
                ...state,
                loading: true
            };
        }

        case fromMyObjects.LOAD_MYOBJECTS_SUCCESS: {
            console.log(action.payload);
            const myObjects = action.payload;

            const entities = myObjects.reduce(
            (entities: { [id: number]: MyObject }, myObject) => {
                return {
                    ...entities,
                    [myObject.id]: myObject
                };
            },
            {
                ...state.entities,
            });

            return {
                ...state,
                loading: false,
                loaded: true,
                entities,
            };
        }

        case fromMyObjects.LOAD_MYOBJECTS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }
    return state;
}

// state selectors
export const getMyObjectsEntities = (state: MyObjectsState) => state.entities;
export const getMyObjectsLoading = (state: MyObjectsState) => state.loading;
export const getMyObjectsLoaded = (state: MyObjectsState) => state.loaded;
