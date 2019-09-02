import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Sidebar from "../layout/Sidebar";
import {connect} from "react-redux";
import {getRoomTypes} from "../../actions/room_types";
import Spinner from "../layout/Spinner";

const RoomTypes = ({getRoomTypes, auth, room_types: {room_types, loading}}) => {
    useEffect(() => {
        getRoomTypes();
    }, []);

    return loading && room_types === null ? <Spinner/> : <Fragment>
        <h1>Room Types</h1>
        <Sidebar/>
        {room_types.map(room_type => (
            <p>{room_type.name} {room_type.price}</p>
        ))}
    </Fragment>
};

RoomTypes.propTypes = {
    getRoomTypes: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    room_types: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    room_types: state.room_types,
});

export default connect(mapStateToProps, {getRoomTypes})(RoomTypes);