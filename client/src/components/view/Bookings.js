import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Sidebar from "../layout/Sidebar";
import {connect} from "react-redux";
import {getBookings, deleteBooking} from "../../actions/bookings";
import Spinner from "../layout/Spinner";

const Bookings = ({getBookings, deleteBooking, auth, bookings: {bookings, loading}}) => {
    useEffect(() => {
        getBookings();
    }, []);

    const onSubmit = (id) => {
        deleteBooking(id);
    };

    return loading && bookings === null ? <Spinner/> : <Fragment>
        <h1>Bookings</h1>
        <Sidebar/>
        {bookings.map(booking => (
            <Fragment>
                <span>{booking.email} {booking.phone} {booking.room.room_number}</span>
                <input type={'submit'} value={'Delete'} onClick={() => onSubmit(booking._id)}/>
                <br/>
            </Fragment>
        ))}
    </Fragment>
};

Bookings.propTypes = {
    auth: PropTypes.object.isRequired,
    getBookings: PropTypes.func.isRequired,
    bookings: PropTypes.object.isRequired,
    deleteBooking: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    bookings: state.bookings
});

export default connect(mapStateToProps, {getBookings, deleteBooking})(Bookings);