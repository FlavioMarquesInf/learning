import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromObjects from './my-objects.reducer';

export interface ProductsState {
    objects: fromObjects.MyObjectsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
    objects: fromObjects.reducer,
};

export const getProductsState = createFeatureSelector<ProductsState>(
    'objects'
);

// myobjects state
export const getMyObjectsState = createSelector(
    getProductsState,
    (state: ProductsState) => state.objects
);

// selectors
export const getAllObjects = createSelector(
         getMyObjectsState,
         fromObjects.getMyObjects
       );

export const getObjectsLoaded = createSelector(
         getMyObjectsState,
         fromObjects.getMyObjectsLoaded
       );

export const getObjectsLoading = createSelector(
         getMyObjectsState,
         fromObjects.getMyObjectsLoading
       );
