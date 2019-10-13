import {CREATE_ROOM_TYPE, GET_ROOM_TYPE, GET_ROOM_TYPES, ROOM_TYPE_ERROR, ROOM_TYPE_REMOVE} from "../actions/types";

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
        case GET_ROOM_TYPE:
            return {
                ...state,
                room_type: payload,
                loading: false
            };
        case ROOM_TYPE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case ROOM_TYPE_REMOVE:
            return state.filter(room_type => {
                if (room_type.id === payload.id) {
                    return false;
                } else {
                    return true;
                }
            });
        case CREATE_ROOM_TYPE:
            return [...state, payload];
        default:
            return state;
    }
}