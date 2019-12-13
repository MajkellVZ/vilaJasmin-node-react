import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {updateBooking} from "../../actions/bookings";

const UpdateBookings = ({updateBooking, booking, isUpdate}) => {
    const initialState = {
        email: '',
        phone: '',
        check_in: '',
        check_out: ''
    };

    useEffect(() => {
        isUpdate && setFormData({...booking});
    }, [booking]);

    const [formData, setFormData] = useState(initialState);

    const {email, phone, check_in, check_out} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onUpdate = (e, id) => {
        e.preventDefault();
        updateBooking(formData, id);
    };

    return <Fragment>
        <form onSubmit={e => onUpdate(e, booking._id)}>
            <input type={'text'} name={'email'} value={email} onChange={e => onChange(e)}/>
            <br/>
            <input type={'text'} name={'phone'} value={phone} onChange={e => onChange(e)}/>
            <br/>
            <input type={"date"} name={'check_in'} value={check_in} onChange={e => onChange(e)}/>
            <br/>
            <input type={"date"} name={'check_out'} value={check_out} onChange={e => onChange(e)}/>
            <br/>
            <input type={'submit'} value={'Update'}/>
        </form>
    </Fragment>
};

UpdateBookings.propTypes = {
    updateBooking: PropTypes.func.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    booking: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    booking: state.bookings.booking
});

export default connect(mapStateToProps, {updateBooking})(UpdateBookings)