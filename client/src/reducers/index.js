import {combineReducers} from "redux";
import alert from './alert';
import auth from './auth';
import room_types from './room_types';
import bookings from "./bookings";
import rooms from "./rooms";
import filters from "./filters";

export default combineReducers({
    alert, auth, room_types, bookings, rooms, filters
});