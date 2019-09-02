import {GET_BOOKINGS, BOOKINGS_ERROR} from "../actions/types";

const initialState = {
    booking: null,
    bookings: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const {type, payload} = action;


    switch (type) {
        case GET_BOOKINGS:
            return {
                ...state,
                bookings: payload,
                loading: false
            };
        case BOOKINGS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}