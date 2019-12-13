import axios from 'axios';
import {setAlert} from "./alert";

import {
    GET_BOOKINGS, BOOKINGS_ERROR, DELETE_BOOKING, GET_BOOKING, UPDATE_BOOKING, CREATE_BOOKING
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

// Get booking
export const getBooking = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/bookings/${id}`);

        dispatch({
            type: GET_BOOKING,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: BOOKINGS_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

//Create Booking
export const createBooking = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`/api/bookings`, formData, config);

        dispatch({
            type: CREATE_BOOKING,
            payload: res.data
        });

        dispatch(setAlert('Booking Created'));
    } catch (e) {
        dispatch({
            type: BOOKINGS_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

//Update Booking
export const updateBooking = (formData, id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        await axios.put(`/api/bookings/${id}`, formData, config);

        dispatch({
            type: UPDATE_BOOKING,
            payload: formData
        });

        dispatch(setAlert('Booking Updated'));
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
    } catch (e) {
        dispatch({
            type: BOOKINGS_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};
