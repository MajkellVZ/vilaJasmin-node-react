import React, {Fragment, useEffect} from 'react';
import CreateRoom from "./CreateRoom";
import PropTypes from 'prop-types';
import Sidebar from "../layout/Sidebar";
import {getRooms, deleteRoom} from "../../actions/rooms";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";

const Rooms = ({getRooms, deleteRoom, auth, rooms: {rooms, loading}}) => {
    useEffect(() => {
        getRooms();
    }, []);

    const onSubmit = (id) => {
        deleteRoom(id);
    };

    return loading && rooms === null ? <Spinner/> :
        <Fragment>
            <CreateRoom/>
            <h1>Rooms</h1>
            <Sidebar/>
            {rooms.map(room => (
                <Fragment>
                    <span>{room.room_number} {room.room_types.name}</span>
                    <input type={'submit'} value={'Delete'} onClick={() => onSubmit(room._id)}/>
                    <br/>
                </Fragment>
            ))}
        </Fragment>
};

Rooms.propTypes = {
    getRooms: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    deleteRoom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    rooms: state.rooms,
});

export default connect(mapStateToProps, {getRooms, deleteRoom})(Rooms);