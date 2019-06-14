import { combineReducers } from 'redux';

import user from './user';
import entities from './entities';
import eventForm from './eventForm';

export default combineReducers({
    user,
    entities,
    eventForm
})