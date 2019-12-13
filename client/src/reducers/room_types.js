import {
    CREATE_ROOM_TYPE,
    GET_ROOM_TYPE,
    GET_ROOM_TYPES,
    ROOM_TYPE_ERROR,
    ROOM_TYPE_REMOVE,
    UPDATE_ROOM_TYPES
} from "../actions/types";

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
        case CREATE_ROOM_TYPE:
            return {
                ...state,
                room_types:
                    {
                        ...state.room_types,
                        total: state.room_types.total + 1,
                        page_size: state.room_types.total + 1 <= 10 ? state.room_types.page_size + 1 : state.room_types.page_size,
                        room_types: [...state.room_types.room_types, payload]
                    },
                loading: false
            };
        case UPDATE_ROOM_TYPES:
            return {
                ...state,
                room_types:
                    {
                        ...state.room_types,
                        room_types: state.room_types.room_types.map(room_type =>
                            room_type._id === payload._id ? payload : room_type
                        ),
                    },
                loading: false
            };
        case ROOM_TYPE_REMOVE:
            return {
                ...state,
                room_types:
                    {
                        ...state.room_types,
                        total: state.room_types.total - 1,
                        page_size: state.room_types.total - 1 >= 0 ? state.room_types.page_size - 1 : state.room_types.page_size,
                        room_types: state.room_types.room_types.filter(room_type => room_type._id !== payload),
                    },
                loading: false
            };
        default:
            return state;
    }
}