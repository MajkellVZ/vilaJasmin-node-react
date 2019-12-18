import {GET_MEDIA, CREATE_MEDIA, DELETE_MEDIA, MEDIA_ERROR} from "../actions/types";

const initialState = {
    media: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_MEDIA:
            return {
                ...state,
                media: payload,
                loading: false
            };
        case MEDIA_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CREATE_MEDIA:
            return {
                ...state,
                media: [...state.media, payload],
                loading: false
            };
        case DELETE_MEDIA:
            return {
                ...state,
                media: state.media.filter(media => media._id !== payload),
                loading: false
            };
        default:
            return state;
    }
}