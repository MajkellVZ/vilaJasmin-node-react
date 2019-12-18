import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {createBooking} from "../../actions/bookings";
import {getRoomCount, getOccupiedRoomCount} from "../../actions/filter";
import {getMedia} from "../../actions/media";

const RoomType = ({getMedia, createBooking, getRoomCount, getOccupiedRoomCount, match, media, filters: {count, occupied_count, error}}) => {
    useEffect(() => {
        getMedia(match.params.name);
        getRoomCount(match.params.name);
    }, [getRoomCount]);

    const [formData, setFormData] = useState({
        isChecked: false,
        check_in: '',
        check_out: '',
        email: '',
        phone: '',
        room_type: match.params.name
    });

    const {isChecked, check_in, check_out, email, phone, room_type} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onCheckAvailability = () => {
        setFormData({...formData, isChecked: true});
        const data = {
            type: room_type,
            check_in: check_in,
            check_out: check_out
        };
        getOccupiedRoomCount(data);
    };

    const onBook = () => {
        const data = {
            room_types: room_type,
            check_in: check_in,
            check_out: check_out,
            email: email,
            phone: phone
        };
        console.log(data);
        createBooking(data);
    };

    return <Fragment>
        {media.media.map(img => (
            <div>
                <img alt={match.params.name} src={`http://localhost:5000/api/media/display/${img.image_path}`}/>
            </div>
        ))}
        <input type={"date"} name={"check_in"} onChange={e => onChange(e)}/>
        <input type={"date"} name={"check_out"} onChange={e => onChange(e)}/>
        <input type={"submit"} value={"Check Availability"} onClick={() => onCheckAvailability()}/>
        <br/>
        <br/>
        {isChecked && <div>
            {error === null && occupied_count < count &&
            <div>
                <input type={"text"} name={"email"} onChange={e => onChange(e)}/>
                <br/>
                <input type={"text"} name={"phone"} onChange={e => onChange(e)}/>
                <br/>
            </div>}
            {error === null && <input type={"submit"} value={occupied_count < count ? "Book" : "No Rooms Available"}
                   disabled={occupied_count >= count} onClick={() => onBook()}/>}
        </div>}
    </Fragment>
};

RoomType.propTypes = {
    match: PropTypes.object.isRequired,
    createBooking: PropTypes.func.isRequired,
    getRoomCount: PropTypes.func.isRequired,
    getOccupiedRoomCount: PropTypes.func.isRequired,
    getMedia: PropTypes.func.isRequired,
    count: PropTypes.object.isRequired,
    occupied_count: PropTypes.object.isRequired,
    media: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    filters: state.filters,
    media: state.media
});

export default connect(mapStateToProps, {getMedia, createBooking, getRoomCount, getOccupiedRoomCount})(RoomType);