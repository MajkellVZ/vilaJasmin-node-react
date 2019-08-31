import {combineReducers} from "redux";
import alert from './alert';
import auth from './auth';
import room_types from './room_types';

export default combineReducers({
    alert, auth, room_types
});