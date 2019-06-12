const SET_USER_DATA = 'SET_USER_DATA';
const LOGOUT_USER = 'LOGOUT_USER';

const initialState = {};

export default function (state = initialState, action) {
    switch( action.type ) {
        case SET_USER_DATA: {
            return {
                ...action.payload
            }
        }
        case LOGOUT_USER: {
            return {
                ...action.payload,
                loggedIn: false
            }
        }
        default:
            return state;
    }
}

export function setUserData(data) {
    return {
        type: SET_USER_DATA,
        payload: data
    }
}

export function logoutUSer() {
    return {
        type: LOGOUT_USER
    }
}