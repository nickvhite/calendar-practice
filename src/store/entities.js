const SET_ENTITIES = 'SET_ENTITIES';
const PUSH_ENTITIES = 'PUSH_ENTITIES';

const initialState = [];

export default function (state = initialState, action) {
    switch( action.type ) {
        case SET_ENTITIES: {
            return [
                ...action.payload
            ]
        }
        case PUSH_ENTITIES: {
            return [
                ...state,
                action.payload
            ]
        }
        default:
            return state;
    }
}

export function setEntities(data) {
    return {
        type: SET_ENTITIES,
        payload: data
    }
}

export function pushEntities(data) {
    return {
        type: PUSH_ENTITIES,
        payload: data
    }
}