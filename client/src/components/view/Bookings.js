import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getBookings, deleteBooking} from "../../actions/bookings";
import {filterBookings} from "../../actions/filter";
import Spinner from "../layout/Spinner";

const Bookings = ({getBookings, deleteBooking, filterBookings, bookings}) => {
    useEffect(() => {
        getBookings();
    }, [getBookings]);

    const [formData, setFormData] = useState({
        filter: ''
    });

    const {filter} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onFilter = () => {
        filterBookings(formData);
    };

    const onDelete = (id) => {
        deleteBooking(id);
    };

    return bookings.loading ? <Spinner/> : <Fragment>
        <input name={'filter'} value={filter} onChange={e => onChange(e)} onKeyUp={() => onFilter()}/>
        {bookings.bookings.bookings.map(booking => (
            <div>
                <span>{booking.email} {booking.phone} {booking.check_in} {booking.check_out}</span>
                <input type={'submit'} value={'Delete'} onClick={() => onDelete(booking._id)}/>
                <br/>
            </div>
        ))}
    </Fragment>
};

Bookings.propTypes = {
    auth: PropTypes.object.isRequired,
    getBookings: PropTypes.func.isRequired,
    bookings: PropTypes.object.isRequired,
    deleteBooking: PropTypes.func.isRequired,
    filterBookings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    bookings: state.bookings
});

export default connect(mapStateToProps, {getBookings, deleteBooking, filterBookings})(Bookings);