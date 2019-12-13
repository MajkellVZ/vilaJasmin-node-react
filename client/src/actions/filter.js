import axios from 'axios';
import {setAlert} from "./alert";

import {FILTER_BY_EMAIL_PHONE, BOOKINGS_ERROR} from "./types";

//filter booking by email or phone
export const filterBookings = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: formData
    };

    try {
        const res = await axios.get(`/api/filter`, config);

        dispatch({
            type: FILTER_BY_EMAIL_PHONE,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: BOOKINGS_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};