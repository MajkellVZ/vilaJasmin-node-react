import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {updateBooking} from "../../actions/bookings";

const UpdateBookings = ({updateBooking, booking, isUpdate, room_types}) => {
    const initialState = {
        email: '',
        phone: '',
        check_in: '',
        check_out: '',
        room_type: ''
    };

    useEffect(() => {
        isUpdate && setFormData({...booking});
    }, [booking]);

    const [formData, setFormData] = useState(initialState);

    const {email, phone, check_in, check_out, room_type} = formData;

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
            <select name={"room_types"} onChange={e => onChange(e)}>
                <option key={"0"} value={"null"}>Choose Room Type</option>
                {room_types.room_types.room_types.map(room_type => (
                        <option selected={booking && room_type._id === booking.room_types} value={room_type._id} key={room_type._id}>{room_type.name}</option>
                    )
                )}
            </select>
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
    room_types: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    booking: state.bookings.booking,
});

export default connect(mapStateToProps, {updateBooking})(UpdateBookings)