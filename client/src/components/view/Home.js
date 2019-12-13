import React, {Fragment, useEffect} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {deleteRoomType, getRoomType, getRoomTypes} from "../../actions/room_types";
import Spinner from "../layout/Spinner";

const Home = ({getRoomTypes, room_types}) => {
    useEffect(() => {
        getRoomTypes();
    }, [getRoomTypes]);

    return (
        room_types.loading ? (<Spinner/>) : (<Fragment>
            <h1>Carousel of images bla bla bla</h1>
            {room_types.room_types.room_types.map(room_type => (
                <div>
                    <Link to={`/room-types/${room_type.name}`}>{room_type.name}</Link>
                    <br/>
                </div>
            ))}
        </Fragment>)
    )
};

Home.propTypes = {
    getRoomTypes: PropTypes.func.isRequired,
    room_types: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    room_types: state.room_types,
});

export default connect(mapStateToProps, {getRoomTypes, deleteRoomType, getRoomType})(Home);