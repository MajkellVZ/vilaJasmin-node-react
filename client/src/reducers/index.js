import {combineReducers} from "redux";
import alert from './alert';
import auth from './auth';
import room_types from './room_types';
import bookings from "./bookings";
import rooms from "./rooms";
import filters from "./filters";
import media from "./media";

export default combineReducers({
    alert, auth, room_types, bookings, rooms, filters, media
});