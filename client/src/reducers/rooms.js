import {GET_ROOMS, ROOMS_ERROR} from "../actions/types";

const initialState = {
    room: null,
    rooms: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const {type, payload} = action;


    switch (type) {
        case GET_ROOMS:
            return {
                ...state,
                rooms: payload,
                loading: false
            };
        case ROOMS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}