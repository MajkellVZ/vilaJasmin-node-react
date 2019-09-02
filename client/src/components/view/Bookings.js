import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Sidebar from "../layout/Sidebar";
import {connect} from "react-redux";
import {getBookings} from "../../actions/bookings";
import Spinner from "../layout/Spinner";

const Bookings = ({getBookings, auth, bookings: {bookings, loading}}) => {
    useEffect(() => {
        getBookings();
    }, []);

    return loading && bookings === null ? <Spinner/> : <Fragment>
        <h1>Bookings</h1>
        <Sidebar/>
        {bookings.map(booking => (
            <p>{booking.email} {booking.phone} {booking.room.room_number}</p>
        ))}
    </Fragment>
};

Bookings.propTypes = {
    auth: PropTypes.object.isRequired,
    getBookings: PropTypes.func.isRequired,
    bookings: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    bookings: state.bookings
});

export default connect(mapStateToProps, {getBookings})(Bookings);