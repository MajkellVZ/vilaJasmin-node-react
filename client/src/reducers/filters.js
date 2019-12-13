import {FILTER_ERROR, GET_OCCUPIED_ROOM_COUNT, GET_ROOM_COUNT_BY_TYPE} from "../actions/types";

const initialState = {
    count: 0,
    occupied_count: 0,
    loading: true,
    error: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_ROOM_COUNT_BY_TYPE:
            return {
                ...state,
                count: payload,
                loading: false
            };
        case GET_OCCUPIED_ROOM_COUNT:
            return {
                ...state,
                error: null,
                occupied_count: payload,
                loading: false
            };
        case FILTER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}