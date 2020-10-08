// import { AppState } from './../state/state';

// import * as PostActions from './post.actions';
// import { Post } from './post.model';

// export type Action = PostActions.All;

import * as PostActions from './post.actions';
export type Action = PostActions.All;

export const initialState = {
    // set initial state
};

export function postReducer(state = initialState, action: Action) {
    switch (action.type) {
        case PostActions.GET_POST: {
            return { ...state, loading: true };
        }

        case PostActions.GET_POST_SUCCESS: {
            return { ...state, ...action.payload, loading: false };
        }

        case PostActions.GET_POST_SUCCESS: {
            return { ...state, ...action.payload, loading: false };
        }

        case PostActions.VOTE_UPDATE: {
            return { ...state, ...action.payload, loading: true };
        }

        case PostActions.VOTE_SUCCESS: {
            return { ...state, ...action.payload, loading: false };
        }

        case PostActions.VOTE_FAIL: {
            return { ...state, ...action.payload, loading: false };
        }

        default:
            return state;
    }
}
