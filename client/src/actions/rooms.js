import axios from 'axios';
import {setAlert} from "./alert";
import {CREATE_ROOM, DELETE_ROOM, GET_ROOM, GET_ROOMS, ROOM_TYPE_ERROR, ROOMS_ERROR, UPDATE_ROOM} from "./types";

//Get rooms
export const getRooms = (page = 0) => async dispatch => {
    try {
        const res = await axios.get(`/api/rooms?page=${page}`);

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

// Get room
export const getRoom = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/rooms/${id}`);

        dispatch({
            type: GET_ROOM,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: ROOM_TYPE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
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

        dispatch({
            type: CREATE_ROOM,
            payload: res.data
        });

        dispatch(setAlert('Room Created'));
    } catch (e) {
        const errors = e.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
};

// Update room
export const updateRoom = (formData, id) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        await axios.put(`/api/rooms/${id}`, formData, config);

        dispatch({
            type: UPDATE_ROOM,
            payload: formData
        });

        dispatch(setAlert('Room Updated'));
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
        await axios.delete(`api/rooms/${id}`);

        dispatch({
            type: DELETE_ROOM,
            payload: id
        });

        dispatch(setAlert('Room Deleted'));
    }  catch (e) {
        dispatch({
            type: ROOM_TYPE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};
