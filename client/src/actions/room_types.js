import axios from 'axios';
import {setAlert} from "./alert";

import {
    GET_ROOM_TYPE, ROOM_TYPE_ERROR
} from "./types";

// Get room type
export const getRoomType = () => async dispatch => {
    try {
        const res = await axios.get(`/api/room/types/5d6546cdcd463307b43c347d`);

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