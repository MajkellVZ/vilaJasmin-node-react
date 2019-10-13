import axios from 'axios';
import {setAlert} from "./alert";
import {CREATE_ROOM_TYPE, GET_ROOM_TYPE, GET_ROOM_TYPES, ROOM_TYPE_ERROR, ROOM_TYPE_REMOVE} from "./types";

// Get room types
export const getRoomTypes = () => async dispatch => {
    try {
        const res = await axios.get(`/api/room/types/`);

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
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/room/types', formData, config);

        // dispatch({
        //     type: CREATE_ROOM_TYPE,
        //     payload: res.data
        // });

        dispatch(setAlert('Room Type Created'));
    } catch (e) {
        const errors = e.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
};

//Delete Room Type
export const deleteRoomType = id => async dispatch => {
  try {
      const res = await axios.delete(`api/room/types/${id}`);

      // dispatch({
      //     type: ROOM_TYPE_REMOVE,
      //     payload: {
      //         id,
      //         loading: true
      //     }
      // });

      dispatch(setAlert('Room Type Deleted'));
  }  catch (e) {
      dispatch({
          type: ROOM_TYPE_ERROR,
          payload: {msg: e.response.statusText, status: e.response.status}
      });
  }
};