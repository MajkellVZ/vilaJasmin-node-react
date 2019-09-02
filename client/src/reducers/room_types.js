import {GET_ROOM_TYPES, ROOM_TYPE_ERROR} from "../actions/types";

const initialState = {
    room_type: null,
    room_types: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const {type, payload} = action;


    switch (type) {
        case GET_ROOM_TYPES:
            return {
                ...state,
                room_types: payload,
                loading: false
            };
        case ROOM_TYPE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}