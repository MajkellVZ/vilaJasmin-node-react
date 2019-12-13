import {BOOKINGS_ERROR, FILTER_BY_EMAIL_PHONE} from "../actions/types";

const initialState = {
    booking: null,
    bookings: [],
    error: null,
    loading: true
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case FILTER_BY_EMAIL_PHONE:
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