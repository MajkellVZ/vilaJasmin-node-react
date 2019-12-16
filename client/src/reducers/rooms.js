import {CREATE_ROOM, DELETE_ROOM, GET_ROOM, GET_ROOMS, ROOMS_ERROR, UPDATE_ROOM} from "../actions/types";

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
        case GET_ROOM:
            return {
                ...state,
                room: payload,
                loading: false
            };
        case ROOMS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CREATE_ROOM:
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    total: state.rooms.total + 1,
                    page_size: state.rooms.total + 1 <= 10 ? state.rooms.page_size + 1 : state.rooms.page_size,
                    rooms: [...state.rooms.rooms, payload]
                },
                loading: false
            };
        case UPDATE_ROOM:
            return {
                ...state,
                rooms:
                    {
                        ...state.rooms,
                        rooms: state.rooms.rooms.map(room =>
                            room._id === payload._id ? payload : room
                        ),
                    },
                loading: false
            };
        case DELETE_ROOM:
            return {
                ...state,
                rooms:
                    {
                        ...state.rooms,
                        total: state.rooms.total - 1,
                        page_size: state.rooms.total - 1 >= 0 ? state.rooms.page_size - 1 : state.rooms.page_size,
                        rooms: state.rooms.rooms.filter(room => room._id !== payload),
                    },
                loading: false
            };
        default:
            return state;
    }
}