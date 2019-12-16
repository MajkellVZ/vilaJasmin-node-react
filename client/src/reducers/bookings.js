import {
    GET_BOOKINGS,
    BOOKINGS_ERROR,
    GET_BOOKING,
    DELETE_BOOKING,
    FILTER_BY_EMAIL_PHONE,
    UPDATE_BOOKING
} from "../actions/types";

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
        case GET_BOOKING:
            return {
                ...state,
                booking: payload,
                loading: false
            };
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
        case UPDATE_BOOKING:
            return {
                ...state,
                bookings:
                    {
                        ...state.bookings,
                        bookings: state.bookings.bookings.map(booking =>
                            booking._id === payload._id ? payload : booking
                        ),
                    },
                loading: false
            };
        case DELETE_BOOKING:
            return {
                ...state,
                bookings: {
                    ...state.bookings,
                    total: state.bookings.total - 1,
                    page_size: state.bookings.total - 1 >= 0 ? state.bookings.page_size - 1 : state.bookings.page_size,
                    bookings: state.bookings.bookings.filter(booking => booking._id !== payload),
                },
                loading: false
            };
        default:
            return state;
    }
}