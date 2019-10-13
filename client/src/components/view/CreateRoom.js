import React, {useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getRoomTypes} from "../../actions/room_types";
import {createRoom, getRooms} from "../../actions/rooms";

const CreateRoom = ({getRoomTypes, createRoom, auth, room_types: {room_types, loading}, getRooms}) => {
    useEffect(() => {
        getRoomTypes();
        getRooms();
    }, []);

    const [formData, setFormData] = useState({
        room_number: '',
        room_types: ''
    });

    const {room_number, room_type} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        createRoom(formData);
        getRooms();
    };

    return (
        <Fragment>
            <form onSubmit={e => onSubmit(e)}>
                <input type={"text"} name={"room_number"} onChange={e => onChange(e)}/>
                <br/>
                <select name={"room_types"} onChange={e => onChange(e)}>
                    <option key={"0"} value={"null"}>Choose Room Type</option>
                    {room_types && room_types.map(room_type => (
                            <option value={room_type._id} key={room_type.id}>{room_type.name}</option>
                        )
                    )}
                </select>
                <br/>
                <input type={"submit"} value={"Add"}/>
            </form>
        </Fragment>
    )
};

CreateRoom.propTypes = {
    getRoomTypes: PropTypes.func.isRequired,
    getRooms: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    room_types: PropTypes.object.isRequired,
    createRoom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    room_types: state.room_types,
});

export default connect(mapStateToProps, {getRoomTypes, createRoom, getRooms})(CreateRoom);