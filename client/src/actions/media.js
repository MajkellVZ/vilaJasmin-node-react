import axios from 'axios';
import {setAlert} from "./alert";
import {GET_MEDIA, CREATE_MEDIA, MEDIA_ERROR, DELETE_MEDIA} from "./types";

export const getAllMedia = () => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:3000/api/media`);

        dispatch({
            type: GET_MEDIA,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: MEDIA_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

export const getMedia = (room_type) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:3000/api/media/${room_type}`);

        dispatch({
            type: GET_MEDIA,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: MEDIA_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

export const createMedia = (room_type, formData) => async dispatch => {
    try {
        const data = new FormData();

        for(var x = 0; x<formData.media.length; x++) {
            console.log(formData.media[x]);
            data.append('room_image', formData.media[x])
        }

        const res = await axios.post(`http://localhost:3000/api/media/${room_type}`, data);

        res.data.map(response => {
            dispatch({
                type: CREATE_MEDIA,
                payload: response
            })
        });

        dispatch(setAlert('Media Uploaded'));
    } catch (e) {
        dispatch({
            type: MEDIA_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

export const deleteMedia = (id) => async dispatch => {
    try {
        await axios.delete(`http://localhost:3000/api/media/${id}`);

        dispatch({
            type: DELETE_MEDIA,
            payload: id
        });

        dispatch(setAlert('Media Deleted'));
    }  catch (e) {
        dispatch({
            type: MEDIA_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};