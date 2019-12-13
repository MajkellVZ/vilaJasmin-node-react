import axios from 'axios';
import {setAlert} from "./alert";
import {
    CREATE_ROOM_TYPE,
    GET_ROOM_TYPE,
    GET_ROOM_TYPES,
    ROOM_TYPE_ERROR,
    ROOM_TYPE_REMOVE,
    UPDATE_ROOM_TYPES
} from "./types";

// Get room types
export const getRoomTypes = (page = 0) => async dispatch => {
    try {
        const res = await axios.get(`/api/room/types?page=${page}`);

        dispatch({
            type: GET_ROOM_TYPES,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: ROOM_TYPE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

// Get room type
export const getRoomType = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/room/types/${id}`);

        dispatch({
            type: GET_ROOM_TYPE,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: ROOM_TYPE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

//Create Room Type
export const createRoomType = (formData) => async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

    try {
        const res = await axios.post('/api/room/types', formData, config);

        dispatch({
            type: CREATE_ROOM_TYPE,
            payload: res.data
        });

        dispatch(setAlert('Room Type Created'));
    } catch (e) {
        dispatch({
            type: ROOM_TYPE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

//Update Room Type
export const updateRoomType = (formData, id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.put(`/api/room/types/${id}`, formData, config);

        console.log(formData);

        dispatch({
            type: UPDATE_ROOM_TYPES,
            payload: formData
        });

        dispatch(setAlert('Room Type Updated'));
    } catch (e) {
        dispatch({
            type: ROOM_TYPE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

//Delete Room Type
export const deleteRoomType = id => async dispatch => {
  try {
      await axios.delete(`api/room/types/${id}`);

      dispatch({
          type: ROOM_TYPE_REMOVE,
          payload: id
      });

      dispatch(setAlert('Room Type Deleted'));
  }  catch (e) {
      dispatch({
          type: ROOM_TYPE_ERROR,
          payload: {msg: e.response.statusText, status: e.response.status}
      });
  }
};