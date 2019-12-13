import axios from 'axios';
import {setAlert} from "./alert";

import {
    GET_BOOKINGS, BOOKINGS_ERROR, DELETE_BOOKING
} from "./types";

// Get bookings
export const getBookings = (page = 0) => async dispatch => {
    try {
        const res = await axios.get(`/api/bookings?page=${page}`);

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

//Delete Booking
export const deleteBooking = id => async dispatch => {
    try {
        await axios.delete(`api/bookings/${id}`);

        dispatch({
            type: DELETE_BOOKING,
            payload: id
        });

        dispatch(setAlert('Booking Deleted'));
    }  catch (e) {
        dispatch({
            type: BOOKINGS_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};
