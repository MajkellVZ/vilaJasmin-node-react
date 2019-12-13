import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getBookings, deleteBooking, getBooking} from "../../actions/bookings";
import {filterBookings} from "../../actions/filter";
import Spinner from "../layout/Spinner";
import UpdateBookings from "./UpdateBookings";

const Bookings = ({getBookings, getBooking, deleteBooking, filterBookings, bookings}) => {
    useEffect(() => {
        getBookings();
    }, [getBookings]);

    const [formData, setFormData] = useState({
        filter: '',
        isUpdate: false
    });

    const {filter, isUpdate} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onFilter = () => {
        filterBookings(formData);
    };

    const onEdit = (id) => {
        getBooking(id);
        setFormData({...formData, isUpdate: true})
    };

    const onDelete = (id) => {
        deleteBooking(id);
    };

    return bookings.loading ? <Spinner/> : <Fragment>
        <UpdateBookings isUpdate={isUpdate}/>
        <input name={'filter'} value={filter} placeholder={'filter...'} onChange={e => onChange(e)} onKeyUp={() => onFilter()}/>
        {bookings.bookings.bookings.map(booking => (
            <div>
                <span>{booking.email} {booking.phone} {booking.room_types.name} {booking.check_in} {booking.check_out}</span>
                <input type={'submit'} value={'Edit'} onClick={() => onEdit(booking._id)}/>
                <input type={'submit'} value={'Delete'} onClick={() => onDelete(booking._id)}/>
                <br/>
            </div>
        ))}
        {bookings.bookings.total_pages > 0 &&
        <div>
            <input type={'submit'} value={'First'} onClick={() => getBookings()}/>
            {bookings.bookings.page <= 0 ? '' : <input type={'submit'} value={'Previous'}
                                                 onClick={() => getBookings(bookings.bookings.page - 1)}/>}
            <input type={'submit'} value={'Current'}/>
            {bookings.bookings.page >= bookings.bookings.total_pages ? '' :
                <input type={'submit'} value={'Next'}
                       onClick={() => getBookings(bookings.bookings.page + 1)}/>}
            <input type={'submit'} value={'Last'} onClick={() => getBookings(bookings.bookings.total_pages)}/>
        </div>
        }
    </Fragment>
};

Bookings.propTypes = {
    auth: PropTypes.object.isRequired,
    getBookings: PropTypes.func.isRequired,
    getBooking: PropTypes.func.isRequired,
    bookings: PropTypes.object.isRequired,
    deleteBooking: PropTypes.func.isRequired,
    filterBookings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    bookings: state.bookings
});

export default connect(mapStateToProps, {getBookings, getBooking, deleteBooking, filterBookings})(Bookings);