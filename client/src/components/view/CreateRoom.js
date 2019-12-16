import React, {useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createRoom, getRooms, updateRoom} from "../../actions/rooms";

const CreateRoom = ({createRoom, updateRoom, room_types, getRooms, room, isUpdate}) => {
    useEffect(() => {
        getRooms();
        isUpdate && setFormData({...room, room_types: room.room_types._id});
    }, [room, getRooms]);

    const [formData, setFormData] = useState({
        room_number: '',
        room_types: ''
    });

    const {room_number} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onInsert = e => {
        e.preventDefault();
        createRoom(formData);
    };

    const onUpdate = (e, id) => {
        e.preventDefault();
        updateRoom(formData, id);
    };

    return (
        <Fragment>
            <form onSubmit={isUpdate ? e => onUpdate(e, room._id) : e => onInsert(e)}>
                <input type={"text"} name={"room_number"} value={room_number} onChange={e => onChange(e)}/>
                <br/>
                <select name={"room_types"} onChange={e => onChange(e)}>
                    <option key={"0"} value={"null"}>Choose Room Type</option>
                    {room_types.room_types.room_types.map(room_type => (
                            <option selected={room_type._id === formData.room_types} value={room_type._id} key={room_type._id}>{room_type.name}</option>
                        )
                    )}
                </select>
                <br/>
                <input type={"submit"} value={isUpdate ? "Update" : "Add"}/>
            </form>
        </Fragment>
    )
};

CreateRoom.propTypes = {
    getRooms: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    room_types: PropTypes.object.isRequired,
    createRoom: PropTypes.func.isRequired,
    updateRoom: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
    isUpdate: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    room: state.rooms.room,
    room_types: state.room_types,
});

export default connect(mapStateToProps, {createRoom, getRooms, updateRoom})(CreateRoom);