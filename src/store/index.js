import { combineReducers } from 'redux';

import user from './user';
import entities from './entities';

export default combineReducers({
    user,
    entities
})