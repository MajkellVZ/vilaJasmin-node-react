import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Sidebar from "../layout/Sidebar";
import {connect} from "react-redux";
import {getRoomTypes, deleteRoomType, getRoomType} from "../../actions/room_types";
import Spinner from "../layout/Spinner";
import CreateRoomTypes from "./CreateRoomTypes";

const RoomTypes = ({getRoomTypes, deleteRoomType, getRoomType, auth, room_types: {room_types, loading}}) => {
    useEffect(() => {
        getRoomTypes();
    }, []);

    const onSubmit = (id) => {
        deleteRoomType(id);
    };

    const onEdit = (id) => {
        getRoomType(id);
    };

    return loading && room_types === null ? <Spinner/> :
        <Fragment>
            <CreateRoomTypes/>
            <h1>Room Types</h1>
            <Sidebar/>
            {room_types.map(room_type => (
                <Fragment>
                    <span>{room_type.name} {room_type.price}</span>
                    <input type={'submit'} value={'Edit'} onClick={() => onEdit(room_type._id)}/>
                    <input type={'submit'} value={'Delete'} onClick={() => onSubmit(room_type._id)}/>
                    <br/>
                </Fragment>
            ))}
        </Fragment>
};

RoomTypes.propTypes = {
    getRoomTypes: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    room_types: PropTypes.object.isRequired,
    deleteRoomType: PropTypes.func.isRequired,
    getRoomType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    room_types: state.room_types,
});

export default connect(mapStateToProps, {getRoomTypes, deleteRoomType, getRoomType})(RoomTypes);