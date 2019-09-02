import axios from 'axios';
import {setAlert} from "./alert";

import {
    GET_BOOKINGS, BOOKINGS_ERROR
} from "./types";

// Get bookings
export const getBookings = () => async dispatch => {
    try {
        const res = await axios.get(`/api/bookings/`);

        dispatch({
            type: GET_BOOKINGS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: BOOKINGS_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};