import axios from 'axios';
import {setAlert} from "./alert";
import {GET_ROOMS, ROOM_TYPE_ERROR, ROOMS_ERROR} from "./types";

//Get rooms
export const getRooms = () => async dispatch => {
    try {
        const res = await axios.get('/api/rooms');

        dispatch({
            type: GET_ROOMS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: ROOMS_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

// Create room
export const createRoom = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/rooms', formData, config);

        dispatch(setAlert('Room Created'));
    } catch (e) {
        const errors = e.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
};

//Delete Room
export const deleteRoom = id => async dispatch => {
    try {
        const res = await axios.delete(`api/rooms/${id}`);

        // dispatch({
        //
        // });

        dispatch(setAlert('Room Deleted'));
    }  catch (e) {
        dispatch({
            type: ROOM_TYPE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};
