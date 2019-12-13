import axios from 'axios';

import {
    FILTER_BY_EMAIL_PHONE,
    BOOKINGS_ERROR,
    GET_ROOM_COUNT_BY_TYPE,
    FILTER_ERROR,
    GET_OCCUPIED_ROOM_COUNT
} from "./types";

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

//Get Room count of given Room Type
export const getRoomCount = (type) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    console.log(type);

    try {
        const res = await axios.get(`api/room/count?type=${type}`, config);

        dispatch({
            type: GET_ROOM_COUNT_BY_TYPE,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: FILTER_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

//Get Occupied Room count
export const getOccupiedRoomCount = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`api/room/occupied/count?type=${data.type}&check_in=${data.check_in}&check_out=${data.check_out}`
            , config);

        dispatch({
            type: GET_OCCUPIED_ROOM_COUNT,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: FILTER_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};