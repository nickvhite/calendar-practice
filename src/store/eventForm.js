const OPEN_CREATING_FORM = 'OPEN_CREATING_FORM';
const CLOSE_CREATING_FORM = 'CLOSE_CREATING_FORM';

const initialState = {
    creatingForm: '',
    infoForm: ''
};

export default function (state = initialState, action) {
    switch( action.type ) {
        case OPEN_CREATING_FORM: {
            return {
                ...state,
                creatingForm: action.payload,
                infoForm: ''
            }
        }
        case CLOSE_CREATING_FORM: {
            return {
                ...state,
                creatingForm: ''
            }
        }
        default:
            return state;
    }
}

export function openCreatingForm(date) {
    return {
        type: OPEN_CREATING_FORM,
        payload: date
    }
}

export function closeCreatingFrom() {
    return {
        type: CLOSE_CREATING_FORM
    }
}